import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import { http } from '../../http';
import { Product } from '../../model';

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Card>
        <CardHeader
          title={product.name.toUpperCase()}
          subheader={`R$ ${product.price}`}
        />
      </Card>
      <CardActions>
        <Button size="small" color="primary" component="a">
          Comprar
        </Button>
      </CardActions>
      <CardMedia style={{ paddingTop: '56%' }} image={product.image_url} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
      </CardContent>
    </div>
  );
};

export default ProductDetailPage;

export const getStaticProps: GetStaticProps<
  ProductDetailPageProps,
  { slug: string }
> = async context => {
  const { slug } = context.params!;

  try {
    const { data: product } = await http.get(`products/${slug}`);

    return {
      props: {
        product
      },
      revalidate: 1 * 60 * 2
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return {
        notFound: true
      };
    }
    throw err;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: products } = await http.get(`products`);

  const paths = products.map((p: Product) => ({
    params: {
      slug: p.slug
    }
  }));

  return { paths, fallback: 'blocking' };
};
