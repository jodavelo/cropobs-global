function HelperComponent(title: string, text: string) {
    return (
        <div>
            <h4>{ title }</h4>
            <p>{ text }</p>
        </div>
    )
}

export const back_button_step = [
    {
        selector: '#back-button',
        content: HelperComponent('Back button', 'Sample text.')
    },
]
export const back_button_step_es = [
    {
        selector: '#back-button',
        content: HelperComponent('Botón de retroceder', 'Sample text')
    },
]

export const back_button_step_pt = [
    {
        selector: '#back-button',
        content: HelperComponent('Botão de voltar', 'Sample text')
    },
]