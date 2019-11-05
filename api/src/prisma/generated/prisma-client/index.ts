// Code generated by Prisma (prisma@1.23.0-test.3). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from 'graphql';
import {
  BaseClientOptions,
  makePrismaClientClass,
  Model
} from 'prisma-client-lib';
import { typeDefs } from './prisma-schema';

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  gamePlay: (where?: GamePlayWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  gamePlay: (where: GamePlayWhereUniqueInput) => GamePlayNullablePromise;
  gamePlays: (args?: {
    where?: GamePlayWhereInput;
    orderBy?: GamePlayOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<GamePlay>;
  gamePlaysConnection: (args?: {
    where?: GamePlayWhereInput;
    orderBy?: GamePlayOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => GamePlayConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createGamePlay: (data: GamePlayCreateInput) => GamePlayPromise;
  updateGamePlay: (args: {
    data: GamePlayUpdateInput;
    where: GamePlayWhereUniqueInput;
  }) => GamePlayPromise;
  updateManyGamePlays: (args: {
    data: GamePlayUpdateManyMutationInput;
    where?: GamePlayWhereInput;
  }) => BatchPayloadPromise;
  upsertGamePlay: (args: {
    where: GamePlayWhereUniqueInput;
    create: GamePlayCreateInput;
    update: GamePlayUpdateInput;
  }) => GamePlayPromise;
  deleteGamePlay: (where: GamePlayWhereUniqueInput) => GamePlayPromise;
  deleteManyGamePlays: (where?: GamePlayWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  gamePlay: (
    where?: GamePlaySubscriptionWhereInput
  ) => GamePlaySubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type MutationType = 'CREATED' | 'UPDATED' | 'DELETED';

export type GamePlayOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'player1_ASC'
  | 'player1_DESC'
  | 'player2_ASC'
  | 'player2_DESC'
  | 'winner_ASC'
  | 'winner_DESC'
  | 'draw_ASC'
  | 'draw_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC';

export interface BoxWhereInput {
  id?: Maybe<String>;
  id_not?: Maybe<String>;
  id_in?: Maybe<String[] | String>;
  id_not_in?: Maybe<String[] | String>;
  id_lt?: Maybe<String>;
  id_lte?: Maybe<String>;
  id_gt?: Maybe<String>;
  id_gte?: Maybe<String>;
  id_contains?: Maybe<String>;
  id_not_contains?: Maybe<String>;
  id_starts_with?: Maybe<String>;
  id_not_starts_with?: Maybe<String>;
  id_ends_with?: Maybe<String>;
  id_not_ends_with?: Maybe<String>;
  player?: Maybe<Int>;
  player_not?: Maybe<Int>;
  player_in?: Maybe<Int[] | Int>;
  player_not_in?: Maybe<Int[] | Int>;
  player_lt?: Maybe<Int>;
  player_lte?: Maybe<Int>;
  player_gt?: Maybe<Int>;
  player_gte?: Maybe<Int>;
  step?: Maybe<Int>;
  step_not?: Maybe<Int>;
  step_in?: Maybe<Int[] | Int>;
  step_not_in?: Maybe<Int[] | Int>;
  step_lt?: Maybe<Int>;
  step_lte?: Maybe<Int>;
  step_gt?: Maybe<Int>;
  step_gte?: Maybe<Int>;
  value?: Maybe<String>;
  value_not?: Maybe<String>;
  value_in?: Maybe<String[] | String>;
  value_not_in?: Maybe<String[] | String>;
  value_lt?: Maybe<String>;
  value_lte?: Maybe<String>;
  value_gt?: Maybe<String>;
  value_gte?: Maybe<String>;
  value_contains?: Maybe<String>;
  value_not_contains?: Maybe<String>;
  value_starts_with?: Maybe<String>;
  value_not_starts_with?: Maybe<String>;
  value_ends_with?: Maybe<String>;
  value_not_ends_with?: Maybe<String>;
  AND?: Maybe<BoxWhereInput[] | BoxWhereInput>;
}

export interface GamePlayCreateInput {
  id?: Maybe<ID_Input>;
  player1: String;
  player2: String;
  winner: String;
  draw: Boolean;
  boxes?: Maybe<BoxCreateManyInput>;
}

export interface GamePlaySubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<GamePlayWhereInput>;
  AND?: Maybe<
    GamePlaySubscriptionWhereInput[] | GamePlaySubscriptionWhereInput
  >;
}

export type GamePlayWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface BoxUpdateManyDataInput {
  id?: Maybe<String>;
  player?: Maybe<Int>;
  step?: Maybe<Int>;
  value?: Maybe<String>;
}

export interface BoxCreateManyInput {
  create?: Maybe<BoxCreateInput[] | BoxCreateInput>;
}

export interface BoxCreateInput {
  id: String;
  player: Int;
  step: Int;
  value: String;
}

export interface GamePlayUpdateInput {
  player1?: Maybe<String>;
  player2?: Maybe<String>;
  winner?: Maybe<String>;
  draw?: Maybe<Boolean>;
  boxes?: Maybe<BoxUpdateManyInput>;
}

export interface BoxUpdateManyInput {
  create?: Maybe<BoxCreateInput[] | BoxCreateInput>;
  deleteMany?: Maybe<BoxScalarWhereInput[] | BoxScalarWhereInput>;
  updateMany?: Maybe<
    BoxUpdateManyWithWhereNestedInput[] | BoxUpdateManyWithWhereNestedInput
  >;
}

export interface BoxUpdateManyWithWhereNestedInput {
  where: BoxScalarWhereInput;
  data: BoxUpdateManyDataInput;
}

export interface BoxRestrictedWhereInput {
  id?: Maybe<String>;
  id_not?: Maybe<String>;
  id_in?: Maybe<String[] | String>;
  id_not_in?: Maybe<String[] | String>;
  id_lt?: Maybe<String>;
  id_lte?: Maybe<String>;
  id_gt?: Maybe<String>;
  id_gte?: Maybe<String>;
  id_contains?: Maybe<String>;
  id_not_contains?: Maybe<String>;
  id_starts_with?: Maybe<String>;
  id_not_starts_with?: Maybe<String>;
  id_ends_with?: Maybe<String>;
  id_not_ends_with?: Maybe<String>;
  player?: Maybe<Int>;
  player_not?: Maybe<Int>;
  player_in?: Maybe<Int[] | Int>;
  player_not_in?: Maybe<Int[] | Int>;
  player_lt?: Maybe<Int>;
  player_lte?: Maybe<Int>;
  player_gt?: Maybe<Int>;
  player_gte?: Maybe<Int>;
  step?: Maybe<Int>;
  step_not?: Maybe<Int>;
  step_in?: Maybe<Int[] | Int>;
  step_not_in?: Maybe<Int[] | Int>;
  step_lt?: Maybe<Int>;
  step_lte?: Maybe<Int>;
  step_gt?: Maybe<Int>;
  step_gte?: Maybe<Int>;
  value?: Maybe<String>;
  value_not?: Maybe<String>;
  value_in?: Maybe<String[] | String>;
  value_not_in?: Maybe<String[] | String>;
  value_lt?: Maybe<String>;
  value_lte?: Maybe<String>;
  value_gt?: Maybe<String>;
  value_gte?: Maybe<String>;
  value_contains?: Maybe<String>;
  value_not_contains?: Maybe<String>;
  value_starts_with?: Maybe<String>;
  value_not_starts_with?: Maybe<String>;
  value_ends_with?: Maybe<String>;
  value_not_ends_with?: Maybe<String>;
  AND?: Maybe<BoxRestrictedWhereInput[] | BoxRestrictedWhereInput>;
}

export interface GamePlayUpdateManyMutationInput {
  player1?: Maybe<String>;
  player2?: Maybe<String>;
  winner?: Maybe<String>;
  draw?: Maybe<Boolean>;
}

export interface GamePlayWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  player1?: Maybe<String>;
  player1_not?: Maybe<String>;
  player1_in?: Maybe<String[] | String>;
  player1_not_in?: Maybe<String[] | String>;
  player1_lt?: Maybe<String>;
  player1_lte?: Maybe<String>;
  player1_gt?: Maybe<String>;
  player1_gte?: Maybe<String>;
  player1_contains?: Maybe<String>;
  player1_not_contains?: Maybe<String>;
  player1_starts_with?: Maybe<String>;
  player1_not_starts_with?: Maybe<String>;
  player1_ends_with?: Maybe<String>;
  player1_not_ends_with?: Maybe<String>;
  player2?: Maybe<String>;
  player2_not?: Maybe<String>;
  player2_in?: Maybe<String[] | String>;
  player2_not_in?: Maybe<String[] | String>;
  player2_lt?: Maybe<String>;
  player2_lte?: Maybe<String>;
  player2_gt?: Maybe<String>;
  player2_gte?: Maybe<String>;
  player2_contains?: Maybe<String>;
  player2_not_contains?: Maybe<String>;
  player2_starts_with?: Maybe<String>;
  player2_not_starts_with?: Maybe<String>;
  player2_ends_with?: Maybe<String>;
  player2_not_ends_with?: Maybe<String>;
  winner?: Maybe<String>;
  winner_not?: Maybe<String>;
  winner_in?: Maybe<String[] | String>;
  winner_not_in?: Maybe<String[] | String>;
  winner_lt?: Maybe<String>;
  winner_lte?: Maybe<String>;
  winner_gt?: Maybe<String>;
  winner_gte?: Maybe<String>;
  winner_contains?: Maybe<String>;
  winner_not_contains?: Maybe<String>;
  winner_starts_with?: Maybe<String>;
  winner_not_starts_with?: Maybe<String>;
  winner_ends_with?: Maybe<String>;
  winner_not_ends_with?: Maybe<String>;
  draw?: Maybe<Boolean>;
  draw_not?: Maybe<Boolean>;
  boxes_some?: Maybe<BoxWhereInput>;
  boxes_every?: Maybe<BoxRestrictedWhereInput>;
  boxes_none?: Maybe<BoxRestrictedWhereInput>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<GamePlayWhereInput[] | GamePlayWhereInput>;
}

export interface BoxScalarWhereInput {
  id?: Maybe<String>;
  id_not?: Maybe<String>;
  id_in?: Maybe<String[] | String>;
  id_not_in?: Maybe<String[] | String>;
  id_lt?: Maybe<String>;
  id_lte?: Maybe<String>;
  id_gt?: Maybe<String>;
  id_gte?: Maybe<String>;
  id_contains?: Maybe<String>;
  id_not_contains?: Maybe<String>;
  id_starts_with?: Maybe<String>;
  id_not_starts_with?: Maybe<String>;
  id_ends_with?: Maybe<String>;
  id_not_ends_with?: Maybe<String>;
  player?: Maybe<Int>;
  player_not?: Maybe<Int>;
  player_in?: Maybe<Int[] | Int>;
  player_not_in?: Maybe<Int[] | Int>;
  player_lt?: Maybe<Int>;
  player_lte?: Maybe<Int>;
  player_gt?: Maybe<Int>;
  player_gte?: Maybe<Int>;
  step?: Maybe<Int>;
  step_not?: Maybe<Int>;
  step_in?: Maybe<Int[] | Int>;
  step_not_in?: Maybe<Int[] | Int>;
  step_lt?: Maybe<Int>;
  step_lte?: Maybe<Int>;
  step_gt?: Maybe<Int>;
  step_gte?: Maybe<Int>;
  value?: Maybe<String>;
  value_not?: Maybe<String>;
  value_in?: Maybe<String[] | String>;
  value_not_in?: Maybe<String[] | String>;
  value_lt?: Maybe<String>;
  value_lte?: Maybe<String>;
  value_gt?: Maybe<String>;
  value_gte?: Maybe<String>;
  value_contains?: Maybe<String>;
  value_not_contains?: Maybe<String>;
  value_starts_with?: Maybe<String>;
  value_not_starts_with?: Maybe<String>;
  value_ends_with?: Maybe<String>;
  value_not_ends_with?: Maybe<String>;
  AND?: Maybe<BoxScalarWhereInput[] | BoxScalarWhereInput>;
  OR?: Maybe<BoxScalarWhereInput[] | BoxScalarWhereInput>;
  NOT?: Maybe<BoxScalarWhereInput[] | BoxScalarWhereInput>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface Box {
  id: String;
  player: Int;
  step: Int;
  value: String;
}

export interface BoxPromise extends Promise<Box>, Fragmentable {
  id: () => Promise<String>;
  player: () => Promise<Int>;
  step: () => Promise<Int>;
  value: () => Promise<String>;
}

export interface BoxSubscription
  extends Promise<AsyncIterator<Box>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<String>>;
  player: () => Promise<AsyncIterator<Int>>;
  step: () => Promise<AsyncIterator<Int>>;
  value: () => Promise<AsyncIterator<String>>;
}

export interface BoxNullablePromise extends Promise<Box | null>, Fragmentable {
  id: () => Promise<String>;
  player: () => Promise<Int>;
  step: () => Promise<Int>;
  value: () => Promise<String>;
}

export interface GamePlayPreviousValues {
  id: ID_Output;
  player1: String;
  player2: String;
  winner: String;
  draw: Boolean;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface GamePlayPreviousValuesPromise
  extends Promise<GamePlayPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  player1: () => Promise<String>;
  player2: () => Promise<String>;
  winner: () => Promise<String>;
  draw: () => Promise<Boolean>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface GamePlayPreviousValuesSubscription
  extends Promise<AsyncIterator<GamePlayPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  player1: () => Promise<AsyncIterator<String>>;
  player2: () => Promise<AsyncIterator<String>>;
  winner: () => Promise<AsyncIterator<String>>;
  draw: () => Promise<AsyncIterator<Boolean>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateGamePlay {
  count: Int;
}

export interface AggregateGamePlayPromise
  extends Promise<AggregateGamePlay>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateGamePlaySubscription
  extends Promise<AsyncIterator<AggregateGamePlay>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface GamePlay {
  id: ID_Output;
  player1: String;
  player2: String;
  winner: String;
  draw: Boolean;
  boxes?: <T = FragmentableArray<Box>>() => T;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface GamePlayPromise extends Promise<GamePlay>, Fragmentable {
  id: () => Promise<ID_Output>;
  player1: () => Promise<String>;
  player2: () => Promise<String>;
  winner: () => Promise<String>;
  draw: () => Promise<Boolean>;
  boxes: <T = FragmentableArray<Box>>() => T;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface GamePlaySubscription
  extends Promise<AsyncIterator<GamePlay>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  player1: () => Promise<AsyncIterator<String>>;
  player2: () => Promise<AsyncIterator<String>>;
  winner: () => Promise<AsyncIterator<String>>;
  draw: () => Promise<AsyncIterator<Boolean>>;
  boxes: <T = Promise<AsyncIterator<BoxSubscription>>>() => T;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface GamePlayNullablePromise
  extends Promise<GamePlay | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  player1: () => Promise<String>;
  player2: () => Promise<String>;
  winner: () => Promise<String>;
  draw: () => Promise<Boolean>;
  boxes: <T = FragmentableArray<Box>>() => T;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface GamePlaySubscriptionPayload {
  mutation: MutationType;
  node: GamePlay;
  updatedFields: String[];
  previousValues: GamePlayPreviousValues;
}

export interface GamePlaySubscriptionPayloadPromise
  extends Promise<GamePlaySubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = GamePlayPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = GamePlayPreviousValuesPromise>() => T;
}

export interface GamePlaySubscriptionPayloadSubscription
  extends Promise<AsyncIterator<GamePlaySubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = GamePlaySubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = GamePlayPreviousValuesSubscription>() => T;
}

export interface GamePlayConnection {
  pageInfo: PageInfo;
  edges: GamePlayEdge[];
}

export interface GamePlayConnectionPromise
  extends Promise<GamePlayConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<GamePlayEdge>>() => T;
  aggregate: <T = AggregateGamePlayPromise>() => T;
}

export interface GamePlayConnectionSubscription
  extends Promise<AsyncIterator<GamePlayConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<GamePlayEdgeSubscription>>>() => T;
  aggregate: <T = AggregateGamePlaySubscription>() => T;
}

export interface GamePlayEdge {
  node: GamePlay;
  cursor: String;
}

export interface GamePlayEdgePromise
  extends Promise<GamePlayEdge>,
    Fragmentable {
  node: <T = GamePlayPromise>() => T;
  cursor: () => Promise<String>;
}

export interface GamePlayEdgeSubscription
  extends Promise<AsyncIterator<GamePlayEdge>>,
    Fragmentable {
  node: <T = GamePlaySubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

export type Long = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: 'GamePlay',
    embedded: false
  },
  {
    name: 'Box',
    embedded: true
  }
];

/**
 * Type Defs
 */
console.log(`${process.env.PRISMA_URL}:${process.env.PRISMA_PORT}`);
export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  models,
  endpoint: `http://${process.env.PRISMA_URL}:${process.env.PRISMA_PORT}`
});
export const prisma = new Prisma();
