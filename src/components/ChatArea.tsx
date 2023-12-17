// @ts-nocheck

import Message from "./message";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import WaveTypingIndicator from "./typingMessage";

export default function ChatArea({ messages, showEmoji, setShowEmoji, userInfo, typing}) {
    function handleEmojiSelection(e) {
        const input = document.getElementById('message');
        input.value += e.native;
        input?.focus();
    }

    return (
        <div className="messages relative flex-1 overflow-scroll flex flex-col-reverse">
            <div className="message flex flex-col gap-2 p-5 text-[16px]">
                
                {
                    messages.map((message) => {
                        return (
                            <Message message={message.body} user={message.sender === userInfo._id ? 1 : 0} />
                        )
                    })
                }
                {
                    typing ? <WaveTypingIndicator /> : null
                }
            </div>
            

            {
                showEmoji ? <div className="absolute top-[27%] right-24">
                    <Picker data={data} onEmojiSelect={handleEmojiSelection} emojisize={20} />
                </div> : null
            }
        </div>
    )
}