import { useMemo } from 'react';
import { useProducts } from '../../context/ProductsContext';
import { useT } from '../../context/LanguageContext';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { Product } from '../../types/Product';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Loader } from '../../components/Loader';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products, loading, error } = useProducts();
  const { recentIds } = useRecentlyViewed();
  const t = useT();

  const recentlyViewed = useMemo(
    () =>
      recentIds
        .map(id => products.find(p => p.itemId === id))
        .filter((p): p is Product => Boolean(p)),
    [recentIds, products],
  );

  const hotPrices = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
        .slice(0, 16),
    [products],
  );

  const brandNew = useMemo(
    () =>
      [...products]
        .filter(p => p.fullPrice === p.price || p.year >= 2018)
        .sort((a, b) => b.year - a.year || b.fullPrice - a.fullPrice)
        .slice(0, 16),
    [products],
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>{t('home.title')}</h1>
      <PicturesSlider />

      {loading && <Loader />}
      {error && (
        <p className={styles.error}>
          {t('common.failedToLoad')}: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <ProductsSlider
            title={t('home.brandNew')}
            products={brandNew}
            showDiscount={false}
          />
          <ShopByCategory />
          <ProductsSlider title={t('home.hotPrices')} products={hotPrices} />

          {recentlyViewed.length > 0 && (
            <ProductsSlider
              title={t('product.recentlyViewed')}
              products={recentlyViewed}
            />
          )}
        </>
      )}
    </div>
  );
};
