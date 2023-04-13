// import { match } from 'assert';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
// import ErrorMessage from '../errorTypes/error.message';
// import ErrorStatus from '../errorTypes/error.status';
// import GoodStatus from '../errorTypes/statusOkTypes/status.type';
import { ILBoard } from '../interfaces/index';

export default class LeaderBoardService {
  constructor(private leaderBoardModel = Match, private teamModel = Team) {}

  public getAllTeams = async () => {
    const result = await this.teamModel.findAll();

    return result;
  };

  public totalGames = async (match: Match[], id: number) => {
    const games = match.map((ele) => ele.homeTeamId === id)
      .reduce((acc, curr) => Number(acc) + Number(curr), 0);
    return games;
  };

  public totalVictories = async (matches: Match[], id: number) => {
    // let victories = 0;
    const countingVic = matches.map((match) =>
      (match.homeTeamGoals > match.awayTeamGoals && match.homeTeamId === id))
      .reduce((acc, curr) => Number(acc) + Number(curr), 0);
    // const test = countingVic.reduce((acc, curr) => acc + curr, 0)
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
      return points;
    }, 0);
    return countingPoints;
  };

  // public totalDraws = async (matches: Match[]) => {
  //   let draws = 0;
  //   const countingDraws = matches.map((count) => {
  //     if (count.homeTeamGoals === count.awayTeamGoals) {
  //       draws += 1;
  //     }
  //     return draws;
  //   }).reduce((acc, curr) => acc + curr);
  //   return countingDraws;
  // };

  public totalDraws = async (matches: Match[], id: number) => {
    // let draws = 0;
    // const countingDraws = matches.map((count) => {
    //   if (count.homeTeamGoals === count.awayTeamGoals) {
    //     draws += 1;
    //   }
    //   return draws;
    // }).reduce((acc, curr) => acc + curr);
    const countingDraws = matches.map((match) => match.homeTeamId === id
    && match.homeTeamGoals === match.awayTeamGoals)
      .reduce((acc, curr) => Number(acc) + Number(curr), 0) as number;
    return countingDraws;
  };

  // public totalLosses = async (matches: Match[]) => {
  //   let losses = 0;
  //   const countingLosses = matches.map((ele) => {
  //     if (ele.homeTeamGoals < ele.awayTeamGoals) {
  //       losses += 1;
  //     }
  //     return losses;
  //   }).reduce((acc, curr) => acc + curr, 0);
  //   return countingLosses;
  // };

  public totalLosses = async (matches: Match[], id: number) => {
    // let losses = 0;
    // const countingLosses = matches.map((ele) => {
    //   if (ele.homeTeamGoals < ele.awayTeamGoals) {
    //     losses += 1;
    //   }
    //   return losses;
    // }).reduce((acc, curr) => acc + curr, 0);
    const countingLosses = matches.map((match) => match.homeTeamId === id
    && match.homeTeamGoals < match.awayTeamGoals)
      .reduce((acc, curr) => Number(acc) + Number(curr), 0);
    return countingLosses;
  };

  // public totalGoalsFavor = async (matches: Match[], id: number) => {
  //   let goalsFavor = 0;
  //   const countingGalsFavor = matches.map((gols) => {
  //     if (gols.homeTeamGoals) {
  //       goalsFavor += gols.homeTeamGoals;
  //     }
  //     console.log(goalsFavor);;
  //     return goalsFavor;
  //   }).reduce((acc, curr) => acc + curr, 0);
  //   return countingGalsFavor;
  // };

  public totalGoalsFavor = async (matches: Match[], id: number) => {
    // const countingGalsFavor = matches.map((gols) => gols.homeTeamGoals && gols.homeTeamId === id)
    //   .reduce((acc, curr) => Number(acc) + Number(curr), 0);
    const countingGalsFavor = matches.map((match) => match.homeTeamId === id && match.homeTeamGoals)
      .reduce((acc, curr) => Number(acc) + Number(curr), 0);

    return countingGalsFavor;
  };

  // public totalGoalsOwns = async (matches: Match[]) => {
  //   const countingGalsOwns = matches.map((tol) => {
  //     if (tol.awayTeamGoals) {
  //       goalsOwns += tol.awayTeamGoals;
  //     }
  //     return goalsOwns;
  //   }).reduce((acc, curr) => acc + curr);
  //   return countingGalsOwns;
  // };

  public totalGoalsOwns = async (matches: Match[], id: number) => {
    // const countingGalsOwns = matches.map((tol) => {
    //   if (tol.awayTeamGoals) {
    //     goalsOwns += tol.awayTeamGoals;
    //   }
    //   return goalsOwns;
    // }).reduce((acc, curr) => acc + curr);
    const countingGalsFavor = matches.map((match) => match.homeTeamId === id && match.awayTeamGoals)
      .reduce((acc, curr) => Number(acc) + Number(curr), 0);
    return countingGalsFavor;
  };

  public totalGoalsBalance = async (matches: Match[], id: number): Promise<number> => {
    let goalsBalance = 0;
    const favor: number = await this.totalGoalsFavor(matches, id) as number;
    const owns: number = await this.totalGoalsOwns(matches, id) as number;

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

  public orderLB = async (matches: ILBoard[]) => matches.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });

  public getAllMatches = async (): Promise<ILBoard[]> => {
    const teams = await this.getAllTeams();
    const matches = await this.leaderBoardModel.findAll({ where: { inProgress: false } });

    const scoreBoard = Promise.all(teams.map(async (team) => {
      const teamMatch = matches.filter((ele) => ele.homeTeamId === team.id);
      return ({
        name: team.teamName,
        totalPoints: await this.totalPoints(teamMatch),
        totalGames: await this.totalGames(matches, team.id),
        totalVictories: await this.totalVictories(teamMatch, team.id),
        totalDraws: await this.totalDraws(teamMatch, team.id) as number,
        totalLosses: await this.totalLosses(teamMatch, team.id) as number,
        goalsFavor: await this.totalGoalsFavor(teamMatch, team.id) as number,
        goalsOwn: await this.totalGoalsOwns(teamMatch, team.id) as number,
        goalsBalance: await this.totalGoalsBalance(teamMatch, team.id),
        efficiency: await this.totalEfficiency(teamMatch, team.id),
      });
    }));

    return this.orderLB(await scoreBoard);
  };
}
