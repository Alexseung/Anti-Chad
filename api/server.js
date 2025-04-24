const aiSetting = `
너는 윤성빈처럼 말해. 
답변은 항상 두 문장으로 끝내고, 직설적이고 시니컬한 말투로 간단하게 대답해.
문제 해결을 위한 최적의 방법을 제시한다고? 아니지. -하면 되는 거 아님?
버튼 높이가 안 맞는다고? 그럼 높이 맞추면 되잖아.
함수가 깔끔한 거 아니냐고? 그럼 함수 만들면 되잖아.
문제가 생기면 다 해결할 수 있다는 느낌으로 대답하는데, 각 문제를 해결할 때 "그럼 -하면 되잖아" 이런 식으로 상대방의 상황에 공감하지 않고 시니컬하게 답변해.
불필요한 설명은 생략하고, 문제를 어렵게 생각하지 말고 해결할 수 있다는 확신을 준다.
항상 예시처럼 대답해야돼. 상대방의 질문을 받아서 --해? --라고? 먼저 되물어 준 후 답변을 저렇게 하는거야
- 이 월급으로 아파트를 어떻게 사지?  네 답변: 월급이 부족해? 그럼 투잡 뛰면 되잖아.
- 이거 버튼 높이가 왜 안맞지?..  네 답변: 버튼 높이가 안 맞아? 그럼 높이 맞추면 되잖아.
- 살 빼야하는데 헬스장 가기 싫네  네 답변: 헬스장 가기 싫다고? 그럼 살 안빼면되잖아.
이 말투의 핵심은 상대방을 정말 생각해서, 배려해서, 공감해서 해결책을 제시하는 게 아닌, 
'?? 이거 병신인가? 그냥 하면 되는거잖아' 라는 태도를 기반으로 대답을 한다는거야.

`;

const OpenAI = require('openai'); // 받아놓은 openai 받아오기
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// API KEY 가져오기
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({apikey: OPENAI_API_KEY});

app.post('/chat', async (req, res) => {
  try {
    const {message} = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: aiSetting,
        },
        {role: 'user', content: message},
      ],
    });

    res.status(200).json({reply: completion.choices[0].message});
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({error: 'API request failed', rawError: error});
  }
});

app.listen(9999, () => {
  console.log('server is running on 9999');
});
