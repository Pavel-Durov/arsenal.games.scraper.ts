import { describe, expect, it } from '@jest/globals';
import { fixturesToRichText } from '../src/format';

describe('Fixtures format', () => {
  it('expect no games', () => {
    expect(
      fixturesToRichText({
        fixtures: [],
        date: new Date('2023-11-16T15:40:00.980Z'),
        venue: 'Emirates Stadium',
        source: 'test.com'
      })
    ).toBe(`📟 *Update for Thu Nov 16 - 15:40 (2023)*
*No upcoming games for the year*
`);
  });
  it('expect single game', () => {
    expect(
      fixturesToRichText({
        date: new Date('2023-11-16T15:40:00.980Z'),
        venue: 'Emirates Stadium',
        fixtures: [
          {
            date: new Date('2023-12-16T15:40:00.980Z'),
            venue: 'Emirates Stadium',
            leage: 'Premier League',
            homeTeam: 'Arsenal',
            awayTeam: 'Chelsea'
          }
        ],
        source: 'test.com'
      })
    ).toBe(`📟 *Update for Thu Nov 16 - 15:40 (2023)*
⚽ *Games at Emirates Stadium for this year*

*Sat Dec 16 - 15:40* - Arsenal VS Chelsea (Premier League)

📡 [Source](test.com)
`);
  });
  it('expect today annotation game', () => {
    expect(
      fixturesToRichText({
        date: new Date('2022-11-16T15:40:00.980Z'),
        venue: 'Emirates Stadium',
        fixtures: [
          {
            date: new Date('2022-12-01'),
            venue: 'Emirates Stadium',
            leage: 'Premier League',
            homeTeam: 'Arsenal',
            awayTeam: 'Chelsea'
          },
          {
            date: new Date('2022-11-16T15:40:00.980Z'),
            venue: 'Emirates Stadium',
            leage: 'Premier League',
            homeTeam: 'Arsenal',
            awayTeam: 'Tel Aviv'
          }
        ],
        source: 'test.com'
      })
    ).toBe(`📟 *Update for Wed Nov 16 - 15:40 (2022)*
⚽ *Games at Emirates Stadium for this year*

*Thu Dec 1 - 00:00* - Arsenal VS Chelsea (Premier League)
*Wed Nov 16 - 15:40* - Arsenal VS Tel Aviv (Premier League)

📡 [Source](test.com)
`);
  });
});
