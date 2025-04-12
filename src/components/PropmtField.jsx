/**
 *
 * Node modules
 */
import { motion } from 'motion/react';
import { useCallback, useRef, useState } from 'react';
import { useNavigation, useSubmit, useParams } from 'react-router-dom';

/**
 *
 * Node modules
 */
import { IconBtn } from './Button';

function PropmtField() {
  //inputfield and input field containerhold reference to their Dom elements
  const inputField = useRef();
  const inputFieldContainer = useRef();

  // manual form submition
  const submit = useSubmit();

  // initial navigation checking state
  const navigation = useNavigation();

  // retrieve the converstionId from the url
  const { conversationId } = useParams();

  // state for input field
  const [placeholderShown, setplaceholderShown] = useState(true);
  const [isMultiline, setIsMultiline] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // handle inputField input change

  const handleInputChange = useCallback(() => {
    if (inputField.current.innerText === '\n')
      inputField.current.innerHTML = '';

    setplaceholderShown(!inputField.current.innerText);
    setIsMultiline(inputFieldContainer.current.clientHeight > 64);
    setInputValue(inputField.current.innerText.trim());
  }, []);

  // move the cursor to the end after paste:
  const moveCursorEnd = useCallback(() => {
    const editableElem = inputField.current;
    const range = document.createRange();
    const selection = window.getSelection();

    // set range to the last editable child of the element

    range.selectNodeContents(editableElem);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }, []);
  // handle text from a  paste:
  const handlePasteText = useCallback(
    (e) => {
      e.preventDefault();
      inputField.current.innerText += e.clipboardData.getData('text');
      handleInputChange();
      moveCursorEnd();
    },
    [handleInputChange, moveCursorEnd],
  );

  // handle submit
  const handleSumbit = useCallback(() => {
    // prevent submition if the form is empty or form submition onGoing
    if (!inputValue || navigation.state === 'submitting') return;

    submit(
      {
        user_prompt: inputValue,
        request_type: 'user_prompt',
      },
      {
        method: 'POST',
        encType: 'application/x-www-form-urlencoded',
        action: `/${conversationId || ''}`,
      },
    );
    inputField.current.innerHTML = '';
    handleInputChange();
  }, [handleInputChange, inputValue, navigation.state, submit, conversationId]);

  const prompFieldVariant = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        when: 'beforeChildern',
        staggerChildren: 0.2,
        duration: 0.4,
        delay: 0.4,
        ease: [0.05, 0.7, 0.1, 1],
      },
    },
  };
  const prompFieldChildernVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <motion.div
      variants={prompFieldVariant}
      initial='hidden'
      animate='visible'
      className={`prompt-field-container ${isMultiline ? 'rounded-large' : ''}`}
      ref={inputFieldContainer}
    >
      <motion.div
        variants={prompFieldChildernVariant}
        className={`prompt-field ${placeholderShown ? '' : 'after:hidden'}`}
        contentEditable={true}
        role='textbox'
        aria-multiline={true}
        aria-label='Enter a prompt here'
        data-placeholder='Enter a prompt here'
        ref={inputField}
        onInput={handleInputChange}
        onPaste={handlePasteText}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            // submit input
            e.preventDefault();
            handleSumbit();
          }
        }}
      />
      <IconBtn
        icon='send'
        title='Submit'
        size='large'
        classes='ms-auto'
        variants={prompFieldChildernVariant}
        onClick={handleSumbit}
      />
      <div className='state-layer'></div>
    </motion.div>
  );
}

export default PropmtField;
