
function checkStreak(match, playerName, streaks) {
    let streak = streaks[playerName];
       
    if (!streak) {
        streaks[playerName] = {
            count: 1,
            type: match.winner === playerName ? 'winning' : 'losing'
        };
    } else if (streak.type === 'winning' && match.winner === playerName) {
        streak.count += 1;
    } else if (streak.type === 'losing' && match.loser === playerName) {
        streak.count += 1;
    }
}

// Assumes match results are sorted with most recent games first
function calculate(matchResults) {
    const awards = [];
    let streaks = {};
    
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