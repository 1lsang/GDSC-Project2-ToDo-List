import Component from "../../core/Component"

export default class ToDo extends Component {
    template() {
        const { text, value, id } = this.props.item
        return `<div data-id="${id}">
                    <button class="toggle-btn">${value ? "✅" : "⬜️"}</button>
                    <span>${text}</span>
                    <button class="delete-btn">❌</button>
                </div>`
    }

    setEvent() {
        const { toggleItem, deleteItem } = this.props
        this.addEvent("click", ".toggle-btn", ({ target }) => {
            toggleItem(Number(target.closest("[data-id]").dataset.id))
        })
        this.addEvent("click", ".delete-btn", ({ target }) => {
            deleteItem(Number(target.closest("[data-id]").dataset.id))
        })
    }
}
