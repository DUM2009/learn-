const assert = require('assert');
const ProfileXP = require('./profile-xp.js');

function createStorage(initialEntries = {}) {
    const store = new Map(Object.entries(initialEntries));

    return {
        get length() {
            return store.size;
        },
        key(index) {
            return Array.from(store.keys())[index] || null;
        },
        getItem(key) {
            return store.has(key) ? store.get(key) : null;
        },
        setItem(key, value) {
            store.set(key, String(value));
        }
    };
}

function testLevelBoundaries() {
    assert.strictEqual(ProfileXP.getLevelFromXP(0), 0);
    assert.strictEqual(ProfileXP.getLevelFromXP(99), 0);
    assert.strictEqual(ProfileXP.getLevelFromXP(100), 1);
    assert.strictEqual(ProfileXP.getLevelFromXP(199), 1);
    assert.strictEqual(ProfileXP.getLevelFromXP(200), 2);
    assert.strictEqual(ProfileXP.getLevelFromXP(300), 3);
}

function testQuizFlowAccumulation() {
    const storage = createStorage();
    const user = { uid: 'student-1', email: 'student@example.com' };
    const quizSource = ProfileXP.buildRewardSource('quiz', 'photosynthesis:luz-vira-energia');

    const firstReward = ProfileXP.awardXPToUser(user, 60, quizSource, storage);
    const secondReward = ProfileXP.awardXPToUser(user, 60, quizSource, storage);
    const profile = ProfileXP.readProfile(storage, user);

    assert.strictEqual(firstReward.awarded, true);
    assert.strictEqual(firstReward.xpAdded, 60);
    assert.strictEqual(secondReward.awarded, false);
    assert.strictEqual(profile.xp, 60);
}

function testChallengeFlowAccumulation() {
    const storage = createStorage();
    const user = { uid: 'student-2', email: 'challenge@example.com' };
    const challengeSource = ProfileXP.buildRewardSource('challenge', 'photosynthesis-goldtest');

    const reward = ProfileXP.awardXPToUser(user, 85, challengeSource, storage);
    const duplicateReward = ProfileXP.awardXPToUser(user, 85, challengeSource, storage);
    const profile = ProfileXP.readProfile(storage, user);

    assert.strictEqual(reward.awarded, true);
    assert.strictEqual(reward.xpAdded, 85);
    assert.strictEqual(duplicateReward.awarded, false);
    assert.strictEqual(profile.xp, 85);
}

function testLegacyMissionMigration() {
    const user = { uid: 'student-3', email: 'legacy@example.com' };
    const storage = createStorage({
        mission_photosynthesis: JSON.stringify({ earnedXP: 190 }),
        mission_biology: JSON.stringify({ earnedXP: 75 })
    });

    const profile = ProfileXP.readProfile(storage, user);
    const savedProfile = JSON.parse(storage.getItem(ProfileXP.getProfileStorageKey(user)));

    assert.strictEqual(profile.xp, 265);
    assert.strictEqual(savedProfile.migrations.legacyMissionXpImported, true);
}

function testCurrentUserProfileAccess() {
    const user = { uid: 'student-4', email: 'current@example.com' };
    const storage = createStorage();

    global.window = {
        exploreCurrentUser: user
    };
    global.localStorage = storage;

    const reward = ProfileXP.awardXPToCurrentUser(100, ProfileXP.buildRewardSource('quiz', 'current-user:quiz'));
    const profile = ProfileXP.getCurrentUserProfile();

    assert.strictEqual(reward.awarded, true);
    assert.strictEqual(profile.xp, 100);

    delete global.window;
    delete global.localStorage;
}

function run() {
    testLevelBoundaries();
    testQuizFlowAccumulation();
    testChallengeFlowAccumulation();
    testLegacyMissionMigration();
    testCurrentUserProfileAccess();
    console.log('XP system validation passed.');
}

run();
