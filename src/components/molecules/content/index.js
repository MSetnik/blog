// Animacije
import { motion } from 'framer-motion'

const Content = ({ text }) => {
  return (
    <div className="content-container">
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

export default Content
