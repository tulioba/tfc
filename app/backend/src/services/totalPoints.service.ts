import Match from '../database/models/Match';

export default class Calculator {
  public totalPoints = async (matches: Match[]) => {
    let points = 0;
    const countingPoints = matches.reduce((acc: number, curr: Match) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
        points += 3;
      }
      if (curr.homeTeamGoals === curr.awayTeamGoals) {
        points += 1;
      }
      return acc + points;
    }, 0);
    return countingPoints;
  };
}
