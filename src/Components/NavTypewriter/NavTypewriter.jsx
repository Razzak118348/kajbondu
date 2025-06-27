import { Cursor, useTypewriter } from "react-simple-typewriter";


const NavTypewriter = () => {
    const [text] = useTypewriter({
        words: ['KajBondu'],
        loop: 1
      })

      return (
        <div className='App'>
          <span>{text}</span>

        </div>
      )
};

export default NavTypewriter;