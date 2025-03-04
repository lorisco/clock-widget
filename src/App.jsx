import './App.css';
import './assets/clock.scss';
import './assets/minutes.scss';
import {useEffect, useRef, useState} from "react";

export default function ModernClock() {
  const [currentDate, setDate] = useState(new Date());
  const requestRef = useRef();

  useEffect(() => {
    let clock = document.querySelector('#utility-clock')
    utilityClock(clock)
    autoResize(clock, 300)

    function utilityClock(container) {
      let dynamic = container.querySelector('.dynamic')
      let hourElement = container.querySelector('.hour')
      let minuteElement = container.querySelector('.minute')
      let secondElement = container.querySelector('.second')

      let div = function(className, innerHTML) {
        let element = document.createElement('div')
        element.className = className
        element.innerHTML = innerHTML || ''
        return element
      }

      let append = function(element) {
        return {
          to: function(parent) {
            parent.appendChild(element)
            return append(parent)
          }
        }
      }

      let anchor = function(element, rotation) {
        let anchor = div('anchor')
        rotate(anchor, rotation)
        append(element).to(anchor).to(dynamic)
      }

      let minute = function(n) {
        let klass = n % 5 === 0 ? 'major' : n % 1 === 0 ? 'whole' : 'part'
        let line = div('element minute-line ' + klass)
        anchor(line, n)
        if (n % 5 === 0) {
          let text = div('anchor minute-text ' + klass)
          let content = div('expand content', (n < 10 ? '0' : '') + n)
          append(content).to(text)
          rotate(text, -n)
          anchor(text, n)
        }
      }

      let hour = function(n) {
        let klass = 'hour-item hour-' + n
        let line = div('element hour-pill ' + klass)
        anchor(line, n * 5)
        let text = div('anchor hour-text ' + klass)
        let content = div('expand content', n)
        append(content).to(text)
        rotate(text, -n * 5)
        anchor(text, n * 5)
      }
      let rotate = function(element, second) {
        element.style.transform = element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)'
      }

      let animate = function() {
        let now = new Date()
        let time = now.getHours() * 3600 +
          now.getMinutes() * 60 +
          now.getSeconds() +
          now.getMilliseconds() / 1000
        rotate(secondElement, time)
        rotate(minuteElement, time / 60)
        rotate(hourElement, time / 60 / 12)
        requestRef.current = requestAnimationFrame(animate)
      }

      for (let i = 1 / 4; i <= 60; i += 1 / 4) minute(i)
      for (let i = 1; i <= 12; i ++) hour(i)

      animate()
    }

    function autoResize(element, nativeSize) {
      let update = function() {
        let parent = element.offsetParent
        let scale = Math.min(parent.offsetWidth, parent.offsetHeight) / nativeSize
        element.style.transform = element.style.webkitTransform = 'scale(' + scale.toFixed(3) + ')'
      }
      update()
      window.addEventListener('resize', update)
    }

    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 600000); // 600000ms = 10minutes

    return () => {
      cancelAnimationFrame(requestRef.current);
      clearInterval(intervalId);
    }
  }, []);

  return (
    <>
        <div className="clock hour-style-text hour-text-style-large hand-style-hollow minute-text-style-none minute-display-style-none minute-style-dot hour-display-style-quarters" id="utility-clock">
          <div className="centre">
            <div className="dynamic"></div>
            <div className="expand round circle-1"></div>
            <div className="anchor hour">
              <div className="element thin-hand"></div>
              <div className="element fat-hand"></div>
            </div>
            <div className="anchor minute">
              <div className="element thin-hand"></div>
              <div className="element fat-hand minute-hand"></div>
            </div>
            <div className="anchor second">
              <div className="element second-hand second-hand-front"></div>
              <div className="element second-hand second-hand-back"></div>
            </div>
            <div className="expand round circle-2"></div>
          </div>
          <div className="date-complication">
            { String(currentDate.getDate()).padStart(2, '0') }
          </div>
        </div>

      <div className="minute-ring">
        <div className="minute-top">
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
        </div>
        <div className="minute-right">
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
        </div>
        <div className="minute-bottom">
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
          <div className="minute minute-horizontal"></div>
        </div>
        <div className="minute-left">
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
          <div className="minute minute-vertical"></div>
        </div>
      </div>
    </>
  );
}
