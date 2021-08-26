import { useState, useEffect } from 'react';

import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button';
import MyLoader from './components/Loader';
import Api from './services/Api';

export default function App() {
  const [hits, setHits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState('');
  const [tag, setTag] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    fetchhits();
  }, [searchQuery]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setHits([]);
  };

  const fetchhits = () => {
    setIsLoading(true);

    Api.findImage(currentPage, searchQuery)
      .then(responseHits => {
        setHits(prevHits => [...prevHits, ...responseHits]);
        setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => setError({ error }))
      .finally(() => setIsLoading(false));
  };

  const handleImageClick = ({ target }) => {
    if (target.nodeName !== 'IMG') {
      return;
    }
    const { url } = target.dataset;
    const tag = target.alt;
    setUrl(url);
    setTag(tag);
    setIsLoading(false);

    toggleModal(false);
  };

  return (
    <Container>
      <Searchbar onSubmit={onChangeQuery} />

      <ImageGallery hits={hits} onClick={handleImageClick} />
      {isLoading && <MyLoader />}
      {hits.length > 0 && !isLoading && <Button onClick={fetchhits} />}
      {showModal && (
        <Modal onClose={toggleModal} onClick={handleImageClick}>
          <img src={url} alt={tag} />
        </Modal>
      )}
    </Container>
  );
}
