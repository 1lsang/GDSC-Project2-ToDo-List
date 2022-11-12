export default class Component {
    target

    state

    props

    constructor(target, props) {
        this.target = target
        this.props = props
        this.render()
    }

    // eslint-disable-next-line class-methods-use-this
    template() {
        return ``
    }

    render() {
        this.target.innerHTML = this.template()
    }
}
