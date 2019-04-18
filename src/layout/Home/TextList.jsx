import React from 'react'
import Text from 'components/Text'

const Checkbox = props => {

    return (
        <div style={{ margin: "20px" }}>
            {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(item => (<Text key={item} variant={item} >{item}Наверное, каждый увлекающийся</Text>))}
            {['subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline'].map(item =>
                <Text key={item} variant={item} style={{ width: "800px" }}>{item}<br />
                    Наверное, каждый увлекающийся околоэлектронными самоделками задавался вопросом,
                         возможно ли сделать лазер самостоятельно, дома. И наверняка, очень часто натыкался на довольно предсказуемый ответ от
                         старших, что это очень сложно или практически невозможно, дескать, лазерное излучение можно получить только из специальных
                         дорогостоящих кристаллов и стекол<br /><br />
                </Text>
            )}
        </div>
    )
}

export default Checkbox