// app/+not-found.tsx
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { translations } from '../i18n/translations'
import { useLanguage } from './context/_LanguageContext';


export default function NotFoundScreen() {
  const { language } = useLanguage() || { language: 'he' };

  return (
    <>
      <Stack.Screen options={{ title: translations.notFound.title[language] }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">{translations.notFound.title[language]}</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">{translations.notFound.link[language]}</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
