'use strict';
const handler = require('../src/v1/handler');

const FACTIONS = ['Human', 'Orc', 'Undead', 'Elf', 'Neutral'];

const UNITS = [
  'Peasant',
  'Footman',
  'Rifleman',
  'Knight',
  'Priest',
  'Sorceress',
  'Spell Breaker',
  'Dragonhawk Rider',
  'Mortar Team',
  'Gyrocopter',
  'Gryphon Rider',
  'Worker',
  'Captain',
  'Paladin',
  'Archmage',
  'Mountain King',
  'Blood Mage',
  'Arthas Menethil',
  'Muradin Bronzebeard',
  'Jaina Proudmoore',
  'Lord Garithos',
  'Uther the Lightbringer',
  "Kael'thas Sunstrider",
  'Sylvanas Windrunner',
  'High Elf Dragonhawk',
  'Peon',
  'Grunt',
  'Raider',
  'Tauren',
  'Troll Headhunter',
  'Kodo Beast',
  'Wyvern Rider',
  'Troll Witch Doctor',
  'Shaman',
  'Spirit Walker',
  'Troll Batrider',
  'Blademaster',
  'Far Seer',
  'Tauren Chieftain',
  'Shadow Hunter',
  'Slave Master',
  'Cairne Bloodhoof',
  'Grom Hellscream',
  'Thrall',
  'Rokhan',
  "Drek'Thar",
  'Nazgrel',
  'Acolyte',
  'Shade',
  'Ghoul',
  'Abomination',
  'Crypt Fiend',
  'Banshee',
  'Necromancer',
  'Death Knight',
  'Lich',
  'Dreadlord',
  'Crypt Lord',
  "Kel'Thuzad",
  'Tichondrius',
  'Varimathras',
  'Archer',
  'Huntress',
  'Dryad',
  'Hippogryph Rider',
  'Druid of the Talon',
  'Druid of the Claw',
  'Keeper of the Grove',
  'Priestess of the Moon',
  'Demon Hunter',
  'Warden',
  'Shandris',
  'Naisha',
  'Illidan Stormrage',
  'Maiev Shadowsong',
  'Tyrande Whisperwind',
  'Malfurion Stormrage',
  'Night Elf Runner',
  'Bandit',
  'Draenei',
  'Forest Troll',
  'Harpy',
  'Ice Troll',
  'Ogre',
  'Goblin Sapper',
  'Goblin Zeppelin',
  'Naga Myrmidon',
  'Naga Siren',
  'Naga Royal Guard',
  'Satyr',
  'Succubus',
  'Akama',
  'Beastmaster',
  'Dark Ranger',
  'Naga Sea Witch',
  'Pandaren Brewmaster',
  'Pit Lord',
  'Tinker',
  'Firelord',
  'Alchemist',
  'Funny Bunny'
];

const ACTIONS = [
  'Ready',
  'What',
  'Yes',
  'Attack',
  'Warcry',
  'Pissed',
  'Dying',
  'Taunt',
  'Kamikaze'
];

test('Ensure quotes returns 200 with all quotes', async () => {
  let response = await handler.quotes({});
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);
  expect(body.length).toBeGreaterThan(1000);
});

test('Ensure quotes returns 200 with only human quotes', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      faction: ['Human']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['faction']).toBe('Human');
  });
});

test('Ensure quotes returns 200 with no human or orc quotes', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      not_faction: ['Human', 'Orc']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['faction']).not.toBe('Human');
    expect(element['faction']).not.toBe('Orc');
  });
});

test('Ensure quotes returns 200 with only footman unit', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      unit: ['Footman']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['unit']).toBe('Footman');
  });
});

test('Ensure quotes returns 200 with no footman or rifleman units', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      not_unit: ['Footman', 'Rifleman']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['unit']).not.toBe('Footman');
    expect(element['unit']).not.toBe('Rifleman');
  });
});

test('Ensure quotes returns 200 with only pissed action', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      action: ['Pissed']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['action']).toBe('Pissed');
  });
});

test('Ensure quotes returns 200 with no pissed or attack actions', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      not_action: ['Pissed', 'Attack']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['action']).not.toBe('Pissed');
    expect(element['action']).not.toBe('Attack');
  });
});

test('Ensure quotes returns 200 with only queried text', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      text: ['Death']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['value']).toContain('Death');
  });
});

test('Ensure quotes returns 200 with only heroes', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      is_hero: ['true']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['isHero']).toBe(true);
  });
});

test('Ensure quotes returns 200 with no heroes', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      is_hero: ['false']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['isHero']).toBe(false);
  });
});

test('Ensure quotes returns 200 with only melee', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      is_melee: ['true']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['isMelee']).toBe(true);
  });
});

test('Ensure quotes returns 200 with no melee', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      is_melee: ['false']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);

  body.forEach(element => {
    expect(element['isMelee']).toBe(false);
  });
});

test('Ensure quotes returns 200 with correct limit and offset', async () => {
  let response = await handler.quotes({
    multiValueQueryStringParameters: {
      limit: [100]
    }
  });
  expect(response['statusCode']).toBe(200);
  let body = JSON.parse(response['body']);
  expect(body.length).toBe(100);

  let response2 = await handler.quotes({
    multiValueQueryStringParameters: {
      limit: [100],
      offset: [50]
    }
  });
  expect(response2['statusCode']).toBe(200);
  let body2 = JSON.parse(response2['body']);
  expect(body2.length).toBe(100);

  expect(body[50]).toStrictEqual(body2[0]);
});

test('Ensure quotesRandom returns 200 with random quote', async () => {
  let response = await handler.quotesRandom({
    multiValueQueryStringParameters: {
      unit: ['Knight'],
      action: ['Pissed']
    }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);
  expect(body['value']).toBeDefined();
  expect(body['faction']).toBe('Human');
  expect(body['unit']).toBe('Knight');
  expect(body['action']).toBe('Pissed');
  expect(body['isHero']).toBe(false);
  expect(body['isMelee']).toBe(true);
  expect(body['id']).toBeDefined();
});

test('Ensure quoteId returns 200 with correct quote', async () => {
  let response = await handler.quotesId({
    pathParameters: { id: 'ee075861-1551-51bc-97c6-68b4fc7712f9' }
  });
  expect(response['statusCode']).toBe(200);

  let body = JSON.parse(response['body']);
  expect(body['value']).toBe('Ready to work.');
  expect(body['faction']).toBe('Human');
  expect(body['unit']).toBe('Peasant');
  expect(body['action']).toBe('Ready');
  expect(body['isHero']).toBe(false);
  expect(body['isMelee']).toBe(true);
  expect(body['id']).toBe('ee075861-1551-51bc-97c6-68b4fc7712f9');
});

test('Ensure quoteId returns 400 with message', async () => {
  let response = await handler.quotesId({
    pathParameters: { id: 'yahaha!' }
  });
  expect(response['statusCode']).toBe(400);

  let body = JSON.parse(response['body']);
  expect(body['message']).toBe(
    'Invalid request. Quote with id yahaha! was not found.'
  );
});

test('Ensure all factions are returend', async () => {
  let response = await handler.factions();
  expect(response['statusCode']).toBe(200);

  expect(JSON.parse(response['body'])).toEqual(FACTIONS);
});

test('Ensure all units are returend', async () => {
  let response = await handler.units();
  expect(response['statusCode']).toBe(200);

  expect(JSON.parse(response['body'])).toEqual(UNITS);
});

test('Ensure only hero units are returned', async () => {
  let response = await handler.units({
    multiValueQueryStringParameters: {
      is_hero: ['true']
    }
  });
  expect(response['statusCode']).toBe(200);

  // Could use a better test
  expect(JSON.parse(response['body']).length).toBeLessThan(50);
});

test('Ensure only four units are returned with offset', async () => {
  let response = await handler.units({
    multiValueQueryStringParameters: {
      limit: ['4'],
      offset: ['4']
    }
  });
  expect(response['statusCode']).toBe(200);

  expect(JSON.parse(response['body']).length).toEqual(4);
  expect(JSON.parse(response['body'])[0]).toBe('Priest');
});

test('Ensures all actions are returend', async () => {
  let response = await handler.actions();
  expect(response['statusCode']).toBe(200);

  expect(JSON.parse(response['body'])).toEqual(ACTIONS);
});
