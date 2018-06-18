const config = require('./config.json');
const moment = require('moment');

module.exports = {
  menuBubble: {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'FIFA World Cup 2018',
          size: 'xl',
          weight: 'bold'
        }
      ]
    },
    hero: {
      type: 'image',
      url: 'https://sitthi.me:3807/static/fifa.jpg',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'md',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              spacing: 'sm',
              contents: [
                {
                  type: 'button',
                  style: 'primary',
                  action: {
                    type: 'postback',
                    label: 'Last Match',
                    displayText: 'Last Match',
                    data: 'LAST'
                  }
                },
                {
                  type: 'button',
                  style: 'primary',
                  action: {
                    type: 'postback',
                    label: 'Next Match',
                    displayText: 'Next Match',
                    data: 'NEXT'
                  }
                }
              ]
            },
            {
              type: 'box',
              layout: 'horizontal',
              spacing: 'sm',
              contents: [
                {
                  type: 'button',
                  style: 'primary',
                  action: {
                    type: 'postback',
                    label: 'Schedule',
                    displayText: 'Schedule',
                    data: 'SCHEDULE'
                  }
                },
                {
                  type: 'button',
                  style: 'primary',
                  action: {
                    type: 'postback',
                    label: 'Group',
                    displayText: 'Group',
                    data: 'GROUP'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  },
  menuLiveBox: {
    type: 'box',
    layout: 'horizontal',
    spacing: 'sm',
    contents: [
      {
        type: 'text',
        text: 'LIVE !',
        size: 'lg',
        color: '#555555',
        weight: 'bold',
        align: 'center'
      }
    ]
  },
  getLiveMatchBox: (match) => {
    let label = `${match.match_hometeam_name}  ${match.match_hometeam_score} : ${match.match_awayteam_score}  ${match.match_awayteam_name}`;
    return {
      type: 'button',
      style: 'primary',
      action: {
        type: 'postback',
        label: label,
        displayText: 'Live Report !!',
        data: 'LIVE'
      }
    }
  },
  getStandingBubble: (teams) => {
    let bubble = {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: teams[0].league_name,
            weight: 'bold',
            size: 'xl',
            margin: 'md'
          },
          {
            type: 'separator',
            margin: 'xl'
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'md',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: 'Team',
                    size: 'sm',
                    color: '#555555',
                    weight: 'bold',
                    flex: 3
                  },
                  {
                    type: 'text',
                    text: 'P',
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                    weight: 'bold'
                  },
                  {
                    type: 'text',
                    text: 'W',
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                    weight: 'bold'
                  },
                  {
                    type: 'text',
                    text: 'D',
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                    weight: 'bold'
                  },
                  {
                    type: 'text',
                    text: 'L',
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                    weight: 'bold'
                  },
                  {
                    type: 'text',
                    text: 'Pt',
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                    weight: 'bold'
                  }
                ]
              },
              {
                type: 'separator',
                margin: 'md'
              },
            ]
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'postback',
              label: 'Schedule',
              data: 'SCHEDULE',
              displayText: 'Schedule'
            },
            style: 'primary'
          }
        ]
      }
    };
    teams.forEach(team => {
      let row = {
        type: 'box',
        layout: 'horizontal',
        margin: 'md',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'icon',
                url: `${config.BASE_URL}/static/flag/${team.team_name.replace(' ', '')}.png`,
                size: 'sm'
              },
              {
                type: 'text',
                text: team.team_name,
                size: 'sm',
                color: '#555555'
              }
            ],
            flex: 3
          },
          {
            type: 'text',
            text: team.overall_league_payed,
            size: 'sm',
            color: '#111111',
            align: 'end'
          },
          {
            type: 'text',
            text: team.overall_league_W,
            size: 'sm',
            color: '#00ff00',
            align: 'end'
          },
          {
            type: 'text',
            text: team.overall_league_D,
            size: 'sm',
            color: '#aaaaaa',
            align: 'end'
          },
          {
            type: 'text',
            text: team.overall_league_L,
            size: 'sm',
            color: '#ff0000',
            align: 'end'
          },
          {
            type: 'text',
            text: team.overall_league_PTS,
            size: 'sm',
            color: '#111111',
            align: 'end'
          }
        ]
      };
      bubble.body.contents[2].contents.push(row);
    });

    return bubble;
  },
  getScheduleBubble: (matchs) => {
    let bubble = {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: matchs[0].league_name,
            weight: 'bold',
            size: 'xl',
            margin: 'md'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'postback',
              label: 'Table',
              data: 'TABLE',
              displayText: 'Table'
            },
            style: 'primary'
          }
        ]
      }
    };
    matchs.forEach(match => {
      let row = {
        type: 'box',
        layout: 'horizontal',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: `${match.match_date}   ${match.match_time}`,
                align: 'start'
              },
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'icon',
                    url: `${config.BASE_URL}/static/flag/${match.match_hometeam_name.replace(' ', '')}.png`,
                    size: 'sm',
                  },
                  {
                    type: 'text',
                    text: match.match_hometeam_name,
                    flex: 3,
                    align: 'start'
                  },
                  {
                    type: 'text',
                    text: `${match.match_hometeam_score}`,
                    flex: 1,
                    align: 'center'
                  },
                ]
              },
              {
                type: 'box',
                layout: 'baseline',
                spacing: 'sm',
                contents: [
                  {
                    type: 'icon',
                    url: `${config.BASE_URL}/static/flag/${match.match_awayteam_name.replace(' ', '')}.png`,
                    size: 'sm',
                  },
                  {
                    type: 'text',
                    text: match.match_awayteam_name,
                    flex: 3,
                    align: 'start'
                  },
                  {
                    type: 'text',
                    text: `${match.match_awayteam_score}`,
                    flex: 1,
                    align: 'center'
                  },
                ]
              }
            ]
          },
          {
            type: 'separator',
          },
          {
            type: 'button',
            flex: 3,
            height: 'sm',
            action: {
              type: 'postback',
              label: 'Detail',
              data: 'INFO_' + match.match_id,
              displayText: `${match.match_hometeam_name} VS ${match.match_awayteam_name}`
            },
          }
        ]
      };
      bubble.body.contents.push({ "type": "separator" });
      bubble.body.contents.push(row2);
    });

    return bubble;
  },
  getMatchContentBubble: (title, match) => {
    let contents = [];
    // title
    contents.push({
      type: 'text',
      text: match.match_status || 'Next Match',
      wrap: true,
      weight: 'bold',
      gravity: 'center',
      size: 'lg'
    });
    //name vs name
    contents.push({
      type: 'box',
      layout: 'baseline',
      spacing: 'sm',
      contents: [
        {
          type: 'icon',
          url: `${config.BASE_URL}/static/flag/${match.match_hometeam_name.replace(' ', '')}.png`,
          size: 'sm',
        },
        {
          type: 'text',
          text: match.match_hometeam_name,
          flex: 3,
          align: 'start'
        },
        {
          type: 'text',
          text: `${match.match_hometeam_score} : ${match.match_awayteam_score}`,
          flex: 1,
          align: 'center'
        },
        {
          type: 'text',
          text: match.match_awayteam_name,
          flex: 3,
          align: 'end'
        },
        {
          type: 'icon',
          url: `${config.BASE_URL}/static/flag/${match.match_awayteam_name.replace(' ', '')}.png`,
          size: 'sm',
        }
      ]
    });
    // detail
    let detail = {
      type: 'box',
      layout: 'vertical',
      margin: 'lg',
      spacing: 'sm',
      contents: []
    };
    // scorer
    if (match.goalscorer) {
      detail.contents.push({
        type: 'box',
        layout: 'baseline',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: 'Scorer',
            color: '#aaaaaa',
            size: 'sm',
            weight: 'bold',
          }
        ]
      });
      match.goalscorer.filter(s => s.time !== '').forEach(scorer => {
        detail.contents.push({
          type: 'box',
          layout: 'baseline',
          spacing: 'sm',
          contents: [
            {
              type: 'text',
              text: scorer.time,
              color: '#aaaaaa',
              size: 'sm',
              flex: 1
            },
            {
              type: 'text',
              text: `${scorer.score}`,
              wrap: true,
              color: '#666666',
              size: 'sm',
              flex: 1
            },
            {
              type: 'icon',
              url: `${config.BASE_URL}/static/football.png`,
              size: 'sm',
            },
            {
              type: 'text',
              text: `${scorer.home_scorer + scorer.away_scorer}`,
              wrap: true,
              color: '#666666',
              size: 'sm',
              flex: 4
            },
            {
              type: 'icon',
              url: `${config.BASE_URL}/static/flag/${(scorer.home_scorer ? match.match_hometeam_name : match.match_awayteam_name).replace(' ', '')}.png`,
              size: 'sm',
            }
          ]
        });
      });
    }
    // card
    if (match.cards) {
      detail.contents.push({
        type: 'box',
        layout: 'baseline',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: 'Card',
            color: '#aaaaaa',
            size: 'sm',
            weight: 'bold',
          }
        ]
      });
      match.cards.filter(c => c.time !== '').forEach(card => {
        detail.contents.push({
          type: 'box',
          layout: 'baseline',
          spacing: 'sm',
          contents: [
            {
              type: 'text',
              text: card.time || '-',
              color: '#aaaaaa',
              size: 'sm',
              flex: 1
            },
            {
              type: 'icon',
              url: `${config.BASE_URL}/static/${card.card}.png`,
              size: 'sm',
            },
            {
              type: 'text',
              text: `${card.home_fault + card.away_fault}`,
              wrap: true,
              color: '#666666',
              size: 'sm',
              flex: 4
            }
          ]
        });
      });
    }
    detail.contents.push({
      "type": "separator",
      "margin": "xxl"
    });
    // group
    detail.contents.push({
      type: 'box',
      layout: 'baseline',
      margin: 'md',
      contents: [
        {
          type: 'text',
          text: 'Group',
          color: '#aaaaaa',
          size: 'sm',
          flex: 2
        },
        {
          type: 'text',
          text: `${match.league_name.replace(' Group ', '')}`,
          wrap: true,
          color: '#666666',
          size: 'sm',
          flex: 4
        }
      ]
    });
    // datetime
    // let datetime = moment(`${match.match_date} ${match.match_time} +05:00`);
    // console.log(datetime);
    detail.contents.push({
      type: 'box',
      layout: 'baseline',
      spacing: 'sm',
      contents: [
        {
          type: 'text',
          text: 'Date',
          color: '#aaaaaa',
          size: 'sm',
          flex: 2
        },
        {
          type: 'text',
          text: `${match.match_date}, ${match.match_time}`,
          wrap: true,
          size: 'sm',
          color: '#666666',
          flex: 4
        }
      ]
    });

    contents.push(detail);

    let header = {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: title,
          size: 'xl',
          weight: 'bold'
        }
      ]
    };
    let body = {
      type: 'box',
      layout: 'vertical',
      spacing: 'md',
      contents: contents,
    };
    let footer = {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          action: {
            type: 'postback',
            label: 'Subscribe Live Result',
            data: 'SUBSCRIBE_' + match.match_id,
            displayText: 'subscribe'
          },
          style: 'primary'
        }
      ]
    };
    let container = {
      type: 'bubble',
      body: body,
    };
    // if (match.match_status !== 'FT') container.footer = footer;
    return container;
  }
}

function createPostBackOption(label, key, data) {
  let shortLabel = label.trimLeft().trimRight().substring(0, 12);
  return { label: shortLabel, type: 'postback', data: (key + (data ? ('_' + data) : '')), displayText: shortLabel };
}

function createUrlOption(label, uri) {
  return { label: label, type: 'uri', uri: uri };
}