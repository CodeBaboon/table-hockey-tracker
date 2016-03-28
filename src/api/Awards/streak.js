import moment from 'moment';

function checkStreak(match, playerName, streaks) {
    let streak = streaks[playerName];
      
    if (!streak) {
        streaks[playerName] = {
            count: 1,
            type: match.winner === playerName ? 'winning' : 'losing',
            isOver: false
        };
    } else if (streak.isOver) {
        // do nothing
    } else if (streak.type === 'winning' && match.winner === playerName) {
        streak.count += 1;
    } else if (streak.type === 'losing' && match.loser === playerName) {
        streak.count += 1;
    } else {
        streak.isOver = true;
    }
}

function compareMatchResults(result1, result2) {
    const date1 = moment(result1.played_on);
    const date2 = moment(result2.played_on);
    
    if (!date1.isValid() || !date2.isValid()) {
        throw new Error();
    }

    if (date1.isAfter(date2)) {
        return -1;
    } else if (date1.isBefore(date2)) {
        return 1;
    } else if (result1.id > result2.id) {
        return -1;
    } else if (result1.id < result2.id) {
        return 1;
    } else {
        return 0;
    }
}

function calculate(matchResults) {
    const awards = [];
    let streaks = {};
    
    matchResults.sort(compareMatchResults);
    
    matchResults.forEach((match) => {
        checkStreak(match, match.home_player, streaks);
        checkStreak(match, match.away_player, streaks);
    });
    
    for (let playerName in streaks) {
        const streak = streaks[playerName];
        if (streak.type === 'winning' && streak.count >= 3) {
            awards.push({
                name: "Winning Streak",
                text: `${playerName} is so hot right now!`,
                description: `${streak.count} game winning streak`
            });
        } else if (streak.type === 'losing' && streak.count >= 3) {
            awards.push({
                name: "Losing Streak",
                text: `${playerName} is cold as ice :(`,
                description: `${streak.count} game losing streak`
            });
        }
    }
    
    return awards;
}

export default calculate;