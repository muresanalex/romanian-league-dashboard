const defaultPlayerDetails = {
    acceleration: 50,
    aggression: 50,
    agility: 50,
    balance: 50,
    ballControl: 50,
    composure: 50,
    crossing: 50,
    curve: 50,
    dribbling: 50,
    finishing: 50,
    fkAccuracy: 50,
    gkDiving: 50,
    gkHandling: 50,
    gkKicking: 50,
    gkPositioning: 50,
    gkReflexes: 50,
    headingAcc: 50,
    interceptions: 50,
    jumping: 50,
    longPassing: 50,
    longShots: 50,
    marking: 50,
    penalties: 50,
    positioning: 50,
    reactions: 50,
    shortPassing: 50,
    shotPower: 50,
    slidingTackle: 50,
    sprintSpeed: 50,
    stamina: 50,
    standingTackle: 50,
    strength: 50,
    vision: 50,
    volleys: 50,
    position: "GK",
    image: "",
};
const defaultAttackingStats = [ "crossing", "finishing", "headingAcc", "shortPassing", "volleys" ];
const defaultSkillStats = [ "dribbling", "curve", "fkAccuracy", "longPassing", "ballControl" ];
const defaultMovementStats = [ "acceleration", "sprintSpeed", "agility", "reactions", "balance" ];
const defaultPowerStats = [ "shotPower", "jumping", "stamina", "strength", "longShots" ];
const defaultMentalityStats = [
    "aggression",
    "interceptions",
    "positioning",
    "vision",
    "penalties",
    "composure",
];
const defaultDefendingStats = [ "marking", "standingTackle", "slidingTackle" ];
const defaultGoalkeepingStats = [
    "gkDiving",
    "gkHandling",
    "gkKicking",
    "gkPositioning",
    "gkReflexes",
];
const defaultOtherStats = [
    "countryId",
    "teamId",
    "position",
    "preferredFoot",
    "weakFoot",
    "potential",
    "internationalReputation",
    "skillMoves",
    "overall",
    "position",
];

export {
    defaultPlayerDetails,
    defaultAttackingStats,
    defaultSkillStats,
    defaultMovementStats,
    defaultPowerStats,
    defaultMentalityStats,
    defaultDefendingStats,
    defaultGoalkeepingStats,
    defaultOtherStats,
};
