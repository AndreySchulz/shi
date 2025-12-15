export const MIN_COUNTDOWN_MS = 3000;
export const MAX_COUNTDOWN_MS = 5000;

export const PHASE = {
  Waiting: "waiting",
  Countdown: "countdown",
  Split: "split",
  Result: "result",
} as const;

export type Phase = (typeof PHASE)[keyof typeof PHASE];

export const PLAYER_ID = {
  Player1: "player1",
  Player2: "player2",
} as const;

export type PlayerId = (typeof PLAYER_ID)[keyof typeof PLAYER_ID];

export const ARENA_COLOR = {
  Red: "red",
  Black: "black",
} as const;

export type ArenaColor = (typeof ARENA_COLOR)[keyof typeof ARENA_COLOR];

export type ColumnLayout = [ArenaColor, ArenaColor];

export type SplitLayout = {
  player1: ColumnLayout;
  player2: ColumnLayout;
};

export const PLAYER_LABEL: Record<PlayerId, string> = {
  [PLAYER_ID.Player1]: "Player 1",
  [PLAYER_ID.Player2]: "Player 2",
};
export const CIRCLE_POSITION = {
  Left: "left",
  Right: "right",
} as const;

export type CirclePosition =
  (typeof CIRCLE_POSITION)[keyof typeof CIRCLE_POSITION];

export type CircleOffsetLayout = {
  player1: [CirclePosition, CirclePosition];
  player2: [CirclePosition, CirclePosition];
};
