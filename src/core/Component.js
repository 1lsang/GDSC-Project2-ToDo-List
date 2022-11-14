export default class Component {
    target

    state

    props

    component

    constructor(target, props, tag = "div") {
        this.component = document.createElement(tag)

        this.target = target
        this.target.appendChild(this.component)

        this.props = props
        this.setup()
        this.setEvent()
        this.render()
    }

    // eslint-disable-next-line class-methods-use-this
    template() {
        return ``
    }

    // eslint-disable-next-line class-methods-use-this
    setup() {}

    render() {
        this.component.innerHTML = this.template()
        this.mounted()
    }

    // eslint-disable-next-line class-methods-use-this
    mounted() {}

    // eslint-disable-next-line class-methods-use-this
    setEvent() {}

    addEvent(eventType, selector, callback) {
        const children = [...document.querySelectorAll(selector)]
        const isTarget = (target) =>
            children.includes(target) || target.closest(selector)
        this.component.addEventListener(eventType, (event) => {
            if (!isTarget(event.target)) return false
            callback(event)
        })
    }

    setState(newState) {
        this.state = { ...this.state, ...newState }
        this.render()
    }
}
