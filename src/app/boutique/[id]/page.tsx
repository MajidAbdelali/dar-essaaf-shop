import { getProductById, getRelatedProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product.id, product.category);

  return <ProductDetail product={product} related={related} />;
}
