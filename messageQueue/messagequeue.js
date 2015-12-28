/**
 * MessageQueue create notification messages
 */
class MessageQueue {


    /**
     * constructor optional container and delay
     */
    constructor(container = document.getElementById('messageContainer'), delay = 5000) {
        this.messageQueue = [];
        this.container = container;
        this.delay = delay;
    }

    clearMessages() {
        this.container.innerHTML = '';
    }

    displayMessages() {
        let messageFrag = document.createElement('div');

        // clear
        this.clearMessages();

        for (let index = 0; index < this.messageQueue.length; index++) {
            let message = document.createTextNode(this.messageQueue[index].text);
            let flash = document.createElement('div');

            flash.classList.add('flash-message');
            flash.classList.add(this.messageQueue[index].msgType);
            flash.appendChild(message);

            messageFrag.appendChild(flash);

        }
        this.container.appendChild(messageFrag);
    }

    remove() {
        this.messageQueue.shift();
        this.displayMessages();
    }

    /**
     * add messages optional type (CSS class)
     */
    add(message, type = 'error') {
        let msg = {
            text: message,
            index: this.messageQueue.length,
            msgType: type,
        };

        setTimeout(() => this.remove(), this.delay);

        this.messageQueue.push(msg);
        this.displayMessages();
    }
}