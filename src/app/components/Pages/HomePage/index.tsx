'use client';

import classNames from 'classnames';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { FC, FormEvent, useRef, useState } from 'react';
import { DeleteIcon, EditIcon } from '~/icons';
import { AnimatedText } from '../../AnimatedText';
import styles from './HomePage.module.scss';

interface IListItem {
  id: string;
  text: string;
  handleDelete: (id: string) => void;
}

const ListItem: FC<IListItem> = ({ id, text, handleDelete }) => (
  <div className={styles.item}>
    <button className="btn-wrapper">
      <EditIcon />
    </button>
    <span className={styles.item__text}>{text}</span>
    <button
      className={classNames('btn-wrapper', styles['trash-icon'])}
      onClick={() => handleDelete(text)}
    >
      <DeleteIcon />
    </button>
  </div>
);

export default function HomePage(): JSX.Element {
  const [listItems, setListItems] = useState(['LOL']);
  const formRef = useRef<HTMLFormElement>(null);

  const handleAdd = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const input = form?.[0] as HTMLInputElement;

    const formValue = input?.value;

    if (!formValue || formValue.length <= 1) {
      return;
    }

    setListItems((items) => [...items, formValue]);
    formRef?.current?.reset();
  };

  const handleDelete = (itemToDelete: string): void => {
    const remainingItems = listItems.filter((x) => x !== itemToDelete);
    setListItems(remainingItems);
  };

  return (
    <>
      {/* <div className="spacer" style={{ height: 1800 }} /> */}
      <div>
        <AnimatedText animateOnce type="h1" text="Testing my animated header" />
      </div>

      <div className={classNames(styles.card, 'mt-4')}>
        <form
          className={styles['input-container']}
          ref={formRef}
          onSubmit={handleAdd}
        >
          <input className={styles.input} type="text" />
          <button
            type="submit"
            className={classNames(styles.btn, styles['btn-secondary'])}
          >
            Add
          </button>
        </form>

        <Reorder.Group
          axis="y"
          values={listItems}
          onReorder={setListItems}
          className={styles['item-list']}
        >
          <AnimatePresence>
            {listItems.map((x) => (
              <Reorder.Item key={x} value={x}>
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.1
                    }
                  }}
                >
                  <ListItem id={x} text={x} handleDelete={handleDelete} />
                </motion.div>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </div>
    </>
  );
}
