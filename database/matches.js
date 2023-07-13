const Match = require("../schemas/match");
const logger = require('../utils/logger');

class MatchesDAO{
    constructor(connection){
        this.connection = connection
    }

    async createMatch(newMatch){
        try{
            return await Match.create(newMatch)
        }catch(err){
            logger.info(err)
        }
    }

    async getNearMatches(coordinates, maxDistance){
        try {
            return await Match.aggregate([
                {
                    $geoNear: {near: {type: 'Point', coordinates},
                    distanceField: 'distance',
                    maxDistance,
                    spherical: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'players',
                    foreignField: '_id',
                    as: 'players'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'host',
                    foreignField: '_id',
                    as: 'host'
                }
            },
            {
                $unwind: '$host'
            }    
        ])
        } catch (err) {
            logger.info(err)
        }
    }

    async getMatches(){
        try {
            return await Match.find().populate('feedback').populate('players.registeredUsers').populate('host');
        } catch (err) {
            logger.info(err)
        }
    }

    async sortMatchByDate(coordinates, maxDistance){
        try{
            return await Match.aggregate([
                {
                    $geoNear: {near: {type: 'Point', coordinates},
                    distanceField: 'distance',
                    maxDistance,
                    spherical: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'players',
                    foreignField: '_id',
                    as: 'players'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'host',
                    foreignField: '_id',
                    as: 'host'
                }
            },
            {
                $unwind: '$host'
            }
        ]).sort({date: 1})
        }catch(err){
            logger.info(err)
        }
    }

    async getMatchByCategory(coordinates, maxDistance, category){
        try{
            const aggregation = Match.aggregate([
                {
                    $geoNear: {near: {type: 'Point', coordinates},
                    distanceField: 'distance',
                    maxDistance,
                    spherical: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'players',
                    foreignField: '_id',
                    as: 'players'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'host',
                    foreignField: '_id',
                    as: 'host'
                }
            },
            {
                $unwind: '$host'
            }
        ])
        const result = await aggregation.exec();
        return result.filter(item => item.category === category);
        }catch(err){
            logger.info(err)
        }
    }

    async getMatchByMatchType(coordinates, maxDistance, matchType){
        try{
            const aggregation = Match.aggregate([
                {
                    $geoNear: {near: {type: 'Point', coordinates},
                    distanceField: 'distance',
                    maxDistance,
                    spherical: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'players',
                    foreignField: '_id',
                    as: 'players'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'host',
                    foreignField: '_id',
                    as: 'host'
                }
            },
            {
                $unwind: '$host'
            }
        ])
        const result = await aggregation.exec();

        return result.filter(item => item.matchType === matchType);
        }catch(err){
            logger.info(err)
        }
    }

    async getMatchById(id){
        try{
            return await Match.findById(id)
        }catch(err){
            logger.info(err)
        }
    }

    async addRegisteredUserToMatch(id, userId){
        try{
            return await Match.findByIdAndUpdate(id, {$push: {players: userId}})
        }catch(err){
            logger.info(err)
        }
    }

    async cancelMatch(id){
        try{
            return await Match.findByIdAndDelete(id)
        }catch(err){
            logger.info(err)
        }
    }

    async postponeMatch(id, newDate){
        try{
            return await Match.findByIdAndUpdate(id, {date: newDate}).lean()
        }catch(err){
            logger.info(err)
        }
    }
}

module.exports = MatchesDAO