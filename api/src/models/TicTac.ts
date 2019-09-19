import tictacModel from '../typings/tictacModel';
import boxModel from '../typings/boxModel';
import { Int, ID_Input } from '../prisma/generated/prisma-client';
import * as Joi from '@hapi/joi';

export class Box implements boxModel {
  id: string;
  player: Int;
  step: Int;
  value: string;
  constructor(id: string, player: number, step: number, value: string) {
    this.id = id;
    this.player = player;
    this.step = step;
    this.value = value;
  }
}
export class Tictac {
  id: ID_Input;
  player1: string;
  player2: string;
  winner: string;
  draw: boolean;
  boxes: Box[];
  constructor(
    id: ID_Input,
    player1: string,
    player2: string,
    winner: string,
    draw: boolean,
    boxes: Box[]
  ) {
    this.id = id;
    this.player1 = player1;
    this.player2 = player2;
    this.winner = winner;
    this.draw = draw;
    this.boxes = boxes;
  }
}
export const GamePlayAdd = Joi.object({
  player1: Joi.string().required(),
  player2: Joi.string().required(),
  winner: Joi.string(),
  draw: Joi.boolean(),
  boxes: Joi.array()
});
export const GameSearch = Joi.object({
  id: Joi.string().required()
});
