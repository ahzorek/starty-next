import { Container, Grid, Heading, Section, Text } from "@radix-ui/themes";

export default function DashboardPage() {
  return (
    <Grid gap="4">
      <Heading size="8" mb="2">Dashboard</Heading>

      <Grid columns="2" gap="4">
        {/* Stats Section */}
        <Section>
          <Heading size="4" mb="4">Estatísticas</Heading>
          <Text as="p" color="gray">
            Em breve você poderá ver suas estatísticas aqui.
          </Text>
        </Section>

        {/* Activity Section */}
        <Section>
          <Heading size="4" mb="4">Atividade Recente</Heading>
          <Text as="p" color="gray">
            Em breve você poderá ver sua atividade recente aqui.
          </Text>
        </Section>
      </Grid>
    </Grid>
  )
} 