const axios = require('axios');
const helpers = require('./helpers');

// Access ENV for API Details
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

// Get Account by searching for summoner name
const getAccount = (summoner, region) => {
    return axios.get(`https://${region}.${API_URL}/summoner/v3/summoners/by-name/${summoner}?api_key=${API_KEY}`)
}

// Get recent matchist using accountId of summoner
const getMatchList = (accountId, region) => {
	return axios.get(`https://${region}.${API_URL}/match/v3/matchlists/by-account/${accountId}?endIndex=10&api_key=${API_KEY}`)
}

// Get match data using gameID from Matchlist
const getMatchData = (gameId, region) => {
	return axios.get(`https://${region}.${API_URL}/match/v3/matches/${gameId}?api_key=${API_KEY}`)
}

// Get Static Champion Data
const getChampions = () => {
	return axios.get(`http://ddragon.leagueoflegends.com/cdn/8.21.1/data/en_US/champion.json`);
}

// Get Static Items Data
const getItems = () => {
	return axios.get(`http://ddragon.leagueoflegends.com/cdn/8.21.1/data/en_US/item.json`);
}

// Get Static Spell Data
const getSpells = () => {
	return axios.get(`http://ddragon.leagueoflegends.com/cdn/8.21.1/data/en_US/summoner.json`);
}

// Get Static Rune Data
const getRunes = () => {
	return axios.get(`http://ddragon.leagueoflegends.com/cdn/8.21.1/data/en_US/runesReforged.json`);
}

// Get All Match Data
async function getMatches(accountId, region){
	try {
        const matchList = await getMatchList(accountId, region);
        const matchesData = matchList.data.matches;

        // Declare matches array
        const matches = [];

        // Cycle through all the matches in the MatchList (Maxed at 10)
        for (const match of matchesData) {

            // Get Additional Match Data this for this match
            const matchData = await getMatchData(match.gameId, region);
            const gameDuration = matchData.data.gameDuration;
            const minutes = Math.floor(gameDuration / 60);
            const seconds = gameDuration - minutes * 60;
            var preseconds = '';
            if(seconds < 10){preseconds = '0'}
            const gameTime = minutes + ':' + preseconds + seconds;

            // Find the participantId for the summoner in this match
            const participantId = matchData.data.participantIdentities.find(p => p.player.accountId === accountId);
            
            // Find the particpant info and stats for the summoner in this match
            const participant = matchData.data.participants.find(p => p.participantId === participantId.participantId);
            const win = participant.stats.win;
            const kills = participant.stats.kills;
            const deaths = participant.stats.deaths;
            const assists = participant.stats.assists;
            const kda = Math.round((kills + assists)/deaths * 100) / 100;
            const champLevel = participant.stats.champLevel;
            const totalMinionsKilled = participant.stats.totalMinionsKilled;
            const averageMinonsKilled =  Math.round(totalMinionsKilled / minutes * 100) / 100;

            // Get the champion used by the summoner in this match
            const listChampions = await getChampions();
            const champion = helpers.findDataKey(participant.championId, listChampions.data.data);

            // Get the spells used by the summoner in this match.
            const listSpells = await getSpells();
            const spell1 = helpers.findDataKey(participant.spell1Id, listSpells.data.data);
            const spell2 = helpers.findDataKey(participant.spell2Id, listSpells.data.data);
            
            // Get the items used by the summoner in this match
            const listItems = await getItems();
            const item1 = helpers.findItemDataObject(participant.stats.item0, listItems.data.data);
            const item2 = helpers.findItemDataObject(participant.stats.item1, listItems.data.data);
            const item3 = helpers.findItemDataObject(participant.stats.item2, listItems.data.data);
            const item4 = helpers.findItemDataObject(participant.stats.item3, listItems.data.data);
            const item5 = helpers.findItemDataObject(participant.stats.item4, listItems.data.data);
            const item6 = helpers.findItemDataObject(participant.stats.item5, listItems.data.data);

            // Get the runes used by the summoner in this match
            const listRunes = await getRunes();
            const primaryPerkStyle = listRunes.data.find(r => r.id === participant.stats.perkPrimaryStyle);
            const primaryPerk = helpers.findRuneDataObject(participant.stats.perk0, primaryPerkStyle);
            const secondaryPerkStyle = listRunes.data.find(r => r.id === participant.stats.perkSubStyle);

            // Push to Match Array
            matches.push({champion, spell1, spell2, primaryPerk, secondaryPerkStyle, item1, item2, item3, item4, item5, item6, gameTime, win, kills, deaths, assists, kda, champLevel, totalMinionsKilled, averageMinonsKilled});
            
        }
		return matches;

	} catch(err) {
		console.log('getMatches', err);

	}
}

module.exports.getAccount = getAccount;
module.exports.getMatches = getMatches;