// Animacije
import { motion } from 'framer-motion'

const ContentWithBottomImg = ({
  text,
  image
}) => {
  return (
      <div className="content-container">
        <div className="">
            <motion.p className='post-text'
              whileInView={{
                opacity: 1,
                transition: { from: 0, duration: 1.5 }
              }}
              style={{ opacity: 0 }}
              >
                {text}
            </motion.p>
        </div>
        <div className='post-image'>
            <motion.img whileInView={{
              opacity: 1,
              transition: { from: 0, duration: 1.5 }
            }} style={{ opacity: 0 }} className='img' src={image}></motion.img>
        </div>
      </div>

  )
}

export default ContentWithBottomImg
