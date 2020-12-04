import React from 'react'
import ReactWordcloud from 'react-wordcloud'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

const options = {
  rotations: 0,
  fontSizes: [14, 60]
}

const size = [500, 300]

const style = {
  marginLeft: -70
}

const Wordcloud = props => {
  const { data, maxWords } = props
  let words = data.sort((a, b) => parseInt(b.count) - parseInt(a.count))
  if (words.length > maxWords) {
    words.splice(maxWords)
  }
  words = words.map(item => ({ text: item.prefLabel, value: item.count }))

  return (
    <ReactWordcloud
      style={style}
      options={options}
      size={size}
      words={words}
    />
  )
}

export default Wordcloud
