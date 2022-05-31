import { useEffect, useState } from 'react';
import { ScrollButtonContainer, ScrollButtonIcon } from './ScrollToTopButton.elements';

export const ScrollToTopButton = () => {
    const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

    const changeScrollToTop = () => {
        if (window.scrollY > 400) {
            setShowScrollToTopButton(true);
        }
        else {
            setShowScrollToTopButton(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeScrollToTop);

        return () => {
            window.removeEventListener('scroll', changeScrollToTop);
        }
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

  return (
    <ScrollButtonContainer>
        {" "}
        {
            showScrollToTopButton && (
                <ScrollButtonIcon 
                onClick={ goToTop }
                />
            )
        }
        {" "}
    </ScrollButtonContainer>
  )
}
