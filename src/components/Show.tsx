import {useState} from 'react';

export default function Show() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:9999/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          personality: 'default',
        }),
      });

      const data = await res.json();
      setResponse(data.reply?.content || '응답 없음');
    } catch (err) {
      console.error(err);
      setResponse('오류 발생');
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    // <div className='flex flex-col h-screen'>
    //   {/* 응답 영역 */}
    //   <div className='flex-1 overflow-y-auto p-4 '>
    //     {response && (
    //       <div>
    //         <p>{response}</p>
    //       </div>
    //     )}
    //   </div>

    //   {/* 입력창 */}
    //   <div className='fixed bottom-0 left-0 w-full py-4'>
    //     <div className='flex items-end mx-10 gap-2 rounded-3xl'>
    //       <textarea
    //         className='border border-stone-900 w-full p-3 rounded-xl focus:outline-none focus:ring-0 h-16 resize-none'
    //         value={input}
    //         onChange={e => setInput(e.target.value)}
    //         onKeyDown={handleEnter}
    //         rows={3}
    //         placeholder='이 월급으로 아파트를 어떻게 사?'
    //       />
    //       <button
    //         onClick={handleSend}
    //         disabled={loading}
    //         className='h-16 bg-stone-400 hover:cursor-pointer hover:bg-stone-500 text-white px-4 py-2 rounded-2xl'
    //       >
    //         {loading ? '전송 중...' : 'SEND'}
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className='flex flex-col h-screen'>
      {/* 응답 영역 */}
      <div className='flex-1 overflow-y-auto p-4'>
        {response && (
          <div>
            <p>{response}</p>
          </div>
        )}
      </div>

      {/* 입력창 */}
      <div className='fixed bottom-0 left-0 w-full py-4'>
        <div className='flex items-end mx-10 gap-2 rounded-3xl sm:mx-4'>
          <textarea
            className='border border-stone-900 w-full p-3 rounded-xl focus:outline-none focus:ring-0 h-16 resize-none sm:h-12 sm:p-2'
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleEnter}
            rows={3}
            placeholder='이 월급으로 아파트를 어떻게 사?'
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className='h-16 bg-stone-400 hover:cursor-pointer hover:bg-stone-500 text-white px-4 py-2 rounded-2xl sm:h-12 sm:px-3 sm:py-2'
          >
            {loading ? '전송 중...' : 'SEND'}
          </button>
        </div>
      </div>
    </div>
  );
}
