export default function NotificationTypeFilter() {
	return (item) => item === "danger" ? "odwołana" : "'zaakceptowana";
}