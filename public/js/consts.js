// card face down = 0, face up = 1;
DOWN = 0;
UP = 1;

// card suit
UNKNOWN = 0;
SPADES = 1;
CLUBS = 2;
HEARTS = 3;
DIAMONDS = 4;

// colours
BLACK = 0;
RED = 2;

// card ranks
// UNKNOWN = 0;
ACE = 1;
TWO = 2;
THREE = 3;
FOUR = 4;
FIVE = 5;
SIX = 6;
SEVEN = 7;
EIGHT = 8;
NINE = 9;
TEN = 10;
JACK = 11;
QUEEN = 12;
KING = 13;

// card positioning
RANK_X = 29;
RANK_Y = 15;
SUIT_X = 29;
SUIT_Y = 71;

// deck spreads
ROW = 0;
LOOP = 1;
//COLLAPSE = 2; for collapse, set offsets to 0.

// tint etc
BTN_TINT_ENBL = 0x00ff88;
BTN_TINT_DSBL = 0x006636;

// board consts

CNST_BRD = {
    self: {
        deck_x: 25,
        deck_y: 355,
        board_x: 175, 
        board_y: 355
    },
    enemy: {
        deck_x: 1115,
        deck_y: 165,
        board_x: 965,
        board_y: 165
    }
}

// tween modes
INSTANT = 0;
CHAINED = 1;