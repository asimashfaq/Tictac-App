import boxModel from './boxModel';
import { ID_Input } from '../prisma/generated/prisma-client';
export default interface ITictacModel {
  id: ID_Input;
  player1: string;
  player2: string;
  winner: string;
  draw: boolean;
  boxes: boxModel[];
}
