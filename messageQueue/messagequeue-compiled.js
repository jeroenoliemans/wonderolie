/**
 * MessageQueue create notification messages
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MessageQueue = (function () {

    /**
     * constructor optional container and delay
     */

    function MessageQueue() {
        var container = arguments[0] === undefined ? document.getElementById('messageContainer') : arguments[0];
        var delay = arguments[1] === undefined ? 5000 : arguments[1];

        _classCallCheck(this, MessageQueue);

        this.messageQueue = [];
        this.container = container;
        this.delay = delay;
    }

    _createClass(MessageQueue, [{
        key: 'clearMessages',
        value: function clearMessages() {
            this.container.innerHTML = '';
        }
    }, {
        key: 'displayMessages',
        value: function displayMessages() {
            var messageFrag = document.createElement('div');

            // clear
            this.clearMessages();

            for (var index = 0; index < this.messageQueue.length; index++) {
                var message = document.createTextNode(this.messageQueue[index].text);
                var flash = document.createElement('div');

                flash.classList.add('flash-message');
                flash.classList.add(this.messageQueue[index].msgType);
                flash.appendChild(message);

                messageFrag.appendChild(flash);
            }
            this.container.appendChild(messageFrag);
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.messageQueue.shift();
            this.displayMessages();
        }
    }, {
        key: 'add',

        /**
         * add messages optional type (CSS class)
         */
        value: function add(message) {
            var _this = this;

            var type = arguments[1] === undefined ? 'error' : arguments[1];

            var msg = {
                text: message,
                index: this.messageQueue.length,
                msgType: type
            };

            setTimeout(function () {
                return _this.remove();
            }, this.delay);

            this.messageQueue.push(msg);
            this.displayMessages();
        }
    }]);

    return MessageQueue;
})();
