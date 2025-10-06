
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <>
      <Header lang={lang} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer lang={lang} />
    </>
  );
}
