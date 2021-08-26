import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, webformatURL, tags, largeImageURL }) => (
  <li key={id} className={styles.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt={tags}
      data-url={largeImageURL}
      className={styles.ImageGalleryItemImage}
    />
  </li>
);

export default ImageGalleryItem;
