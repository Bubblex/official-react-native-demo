import React from 'react'
import {
    ART,
} from 'react-native'

const { Surface, Shape, Path } = ART

const T_WIDTH = 7
const T_HEIGHT = 4

const COLOR_HIGH = '#108ee9'
const COLOR_NORMAL = '#6c6c6c'

class Triangle extends React.Component {
    render() {
        let path
        let fill
        if (this.props.selected) {
            fill = COLOR_HIGH
            path = new Path()
                .moveTo(T_WIDTH / 2, 0)
                .lineTo(0, T_HEIGHT)
                .lineTo(T_WIDTH, T_HEIGHT)
                .close()
        } else {
            fill = COLOR_NORMAL
            path = new Path()
                .moveTo(0, 0)
                .lineTo(T_WIDTH, 0)
                .lineTo(T_WIDTH / 2, T_HEIGHT)
                .close()
        }

        return (
            <Surface width={T_WIDTH} height={T_HEIGHT}>
                <Shape d={path} stroke='#00000000' fill={fill} strokeWidth={0} />
            </Surface>
        )
    }
}

export default Triangle
