// Animations
import { motion } from 'framer-motion'

const ContentWithTitle = ({
  title,
  text
}) => {
  return (
    <div className="content-container ">
        <motion.h4
          whileInView={{
            opacity: 1,
            transition: { from: 0, duration: 1 }
          }}
          style={{ opacity: 0 }}
          className="post-subtitle">{title}</motion.h4>
        <motion.p
          whileInView={{
            opacity: 1,
            transition: { from: 0, duration: 1.5 }
          }}
          style={{ opacity: 0 }}
          className='post-text'>
            {text}
        </motion.p>
    </div>
  )
}

export default ContentWithTitle
