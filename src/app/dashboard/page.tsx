import { UserCard } from "@/components/auth/dashboard/user-card";
import { SignOutButton } from "@/components/auth/sign-out-btn"
import { Container, Flex, Heading } from "@radix-ui/themes";

const DashboardPage = () => {
	return (
		<div className="grid items-center min-h-screen p-6 gap-16">
			<main className="flex flex-col gap-8 items-start">
				<Heading size="8">Dashboard</Heading>
				<Container size="4">
					<Flex width="100%" justify="between">
						<UserCard />
						<SignOutButton />
					</Flex>
				</Container>
			</main>
		</div>
	)
};

export default DashboardPage