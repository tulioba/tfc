import Match from '../database/models/Match';
import Team from '../database/models/Team';
// import ErrorMessage from '../errorTypes/error.message';
// import ErrorStatus from '../errorTypes/error.status';
// import GoodStatus from '../errorTypes/statusOkTypes/status.type';
// import { ILBoard } from '../interfaces/index';

export default class LeaderBoardService {
  constructor(private leaderBoardModel = Match, private teamModel = Team) {}

  public getAllTeams = async () => {
    const result = await this.teamModel.findAll();

    return result;
  };

  public totalGames = async (match: Match[], id: number) => {
    const games = match.map((ele) => ele.homeTeamId === id)
      .reduce((acc, curr) => Number(acc) + Number(curr), 0);
    console.log(games);
    return games;
  };

  public totalVictories = async (matches: Match[]) => {
    let victories = 0;
    const countingVic = matches.map((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        victories += 1;
      }
      return victories;
    }).reduce((acc, curr) => acc + curr);
    return countingVic;
  };

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

  public totalDraws = async (matches: Match[]) => {
    let draws = 0;
    const countingDraws = matches.map((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        draws += 1;
      }
      return draws;
    }).reduce((acc, curr) => acc + curr);
    return countingDraws;
  };

  public totalLosses = async (matches: Match[]) => {
    let losses = 0;
    const countingLosses = matches.map((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        losses += 1;
      }
      return losses;
    }).reduce((acc, curr) => acc + curr, 0);
    return countingLosses;
  };

  public totalGoalsFavor = async (matches: Match[]) => {
    let goalsFavor = 0;
    const countingGalsFavor = matches.map((match) => {
      if (match.homeTeamGoals) {
        goalsFavor += match.homeTeamGoals;
      }
      return goalsFavor;
    }).reduce((acc, curr) => acc + curr, 0);
    return countingGalsFavor;
  };

  public totalGoalsOwns = async (matches: Match[]) => {
    let goalsOwns = 0;
    const countingGalsOwns = matches.map((match) => {
      if (match.awayTeamGoals) {
        goalsOwns += match.awayTeamGoals;
      }
      return goalsOwns;
    }).reduce((acc, curr) => acc + curr);
    return countingGalsOwns;
  };

  public totalGoalsBalance = async (matches: Match[]): Promise<number> => {
    let goalsBalance = 0;
    const favor: number = await this.totalGoalsFavor(matches);
    const owns: number = await this.totalGoalsOwns(matches);

    goalsBalance = favor - owns;

    return goalsBalance;
  };

  public totalEfficiency = async (matches: Match[], id: number) => {
    const games = await this.totalGames(matches, id);
    const totalPoins = await this.totalPoints(matches);

    const points = (totalPoins / (games * 3));

    const pointsEfficiency = points * 100;
    return pointsEfficiency.toFixed(2);
  };

  public getAllMatches = async () => {
    const teams = await this.getAllTeams();
    const matches = await this.leaderBoardModel.findAll({ where: { inProgress: false } });

    const scoreBoard = Promise.all(teams.map(async (team) => {
      const teamMatch = matches.filter((match) => match.homeTeamId === team.id);
      return ({
        name: team.teamName,
        totalPoints: await this.totalPoints(teamMatch),
        totalGames: await this.totalGames(matches, team.id),
        totalVictories: await this.totalVictories(teamMatch),
        totalDraws: await this.totalDraws(teamMatch),
        totalLosses: await this.totalLosses(teamMatch),
        goalsFavor: await this.totalGoalsFavor(teamMatch),
        goalsOwn: await this.totalGoalsOwns(teamMatch),
        goalsBalance: await this.totalGoalsBalance(teamMatch),
        efficiency: await this.totalEfficiency(teamMatch, team.id),
      });
    }));

    return scoreBoard;
  };
}
