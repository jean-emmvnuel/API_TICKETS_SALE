const Event = require('../models/Event');
const TicketType = require('../models/TicketType');


//récuperer la liste de tous les évènements
async function getAllEvents(req,res){
    try{
        const events = await Event.allEvents();
        for (let event of events) {
            event.TicketType = await TicketType.findByEventId(event.id);
        }
        res.json(events);
    } catch(error) {
        resizeTo.status(500).json({
            message : "Erreur lors de la récuperation des evenements"
        })
    }
}

//recuperer un evenement à partir de son ID
async function getEventById(req, res){
    try{
        const event = await Event.findById(req.params.id);
        if(!event){
            res.status(404).json({
                message: 'Evenement non trouvé'
            })
        }else {
            res.json(event);
        }
    } catch(error) {
        console.error("Erreur lors de la recuperation de l'evenement ",error)
        res.status(500).json({
            message: 'Erreur lors de la recuperation de l\'evenement',
            erreur : error.message
        })
    }
}

//ajouter un evenement à la base de donnée
//reserver aux admins
async function createEvent(req, res){
    console.log(req.user);
    created_by = req.user.id;
    const { titre, description, date, lieu, image_url, capacité_totale, ticket_types } = req.body;
    if (!created_by) {
        return res.status(401).json({ message: "ID utilisateur manquant. Authentification requise." });
    }
    try {
        const eventId = await Event.AddEvent(titre, description, date, lieu, image_url, capacité_totale, created_by);
        if (ticket_types) {
            for (let ticket of ticket_types) {
                await TicketType.addTicketType(eventId, ticket.nom, ticket.prix, ticket.quantité_totale, ticket.quantité_restante);
            }
        }
        res.status(201).json({ id: eventId, message: 'Événement créé avec succès' });
    } catch (error) {
        console.error("Erreur lors de la créeation de l'evenement ",error)
        res.status(400).json({ 
            message: 'Erreur lors de la création de l\'événement',
            erreur : error
        });
    }
};


module.exports = {getAllEvents, getEventById, createEvent}