'use client'

import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { IOrder } from "../../../../utils/interfaces" 
import Chart from "chart.js/auto"

type TypeAnalys = { [key: string]: { count: number, totalPrice: number}}
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getUserOrder( orders: IOrder[] ) {
	const analys: TypeAnalys = {}
	orders.forEach((order: IOrder) => {
		if(order.user in analys) {
			analys[order.user].count++
			analys[order.user].totalPrice += order.price
		} else {
			analys[order.user] = { count: 1, totalPrice: order.price}
		}
	})
	return analys
}

function bestUsers(data: IOrder[]) {
	const analys = getUserOrder(data);
	let moreOrder: TypeAnalys = {};
	let morePrice: TypeAnalys = {};
	for (let user in analys) {
			if (!Object.values(moreOrder).length || analys[user].count > Object.values(moreOrder)[0].count) {
					moreOrder = { [user]: analys[user] };
			}
			if (!Object.values(morePrice).length || analys[user].totalPrice > Object.values(morePrice)[0].totalPrice) {
					morePrice = { [user]: analys[user] };
			}
	}
	return { moreOrder, morePrice };
}

export default function PageProduct() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const canvasRef2 = useRef<HTMLCanvasElement>(null)
	// const [myChart, setMyChart] = useState<ChartConfiguration<'line'> | null>(null);

	useEffect(() => {
    async function fetchData() {
      try {
            const response = await axios.get("/api/orders");
            const data: IOrder[] = response.data;
            const { moreOrder, morePrice } = bestUsers(data);
            const ordersMonth: number[] = Array.from({ length: 12 }, () => 0);
            const incomeMonth: number[] = Array.from({ length: 12 }, () => 0);
            data.forEach((d) => {
                const date = new Date(d.createdAt);
                ordersMonth[date.getMonth()] += d.products.reduce((acc, product) => acc + product.count, 0);
                incomeMonth[date.getMonth()] += d.price;
            });

            const ordersChart = {
                labels: months,
                datasets: [
                    {
                        label: 'Orders',
                        data: ordersMonth,
                        fill: true,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            };

            const incomeChart = {
                labels: months,
                datasets: [
                    {
                        label: 'Income',
                        data: incomeMonth,
                        fill: true,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            };

						console.log(incomeMonth)

            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Destroy existing Chart instance if it exists
            if ((canvas as any).chart) {
                (canvas as any).chart.destroy();
            }

            (canvas as any).chart = new Chart(ctx, {
                type: 'line',
                data: ordersChart,
            });

            const canvas2 = canvasRef2.current;
            if (!canvas2) return;

            const ctx2 = canvas2.getContext('2d');
            if (!ctx2) return;

            // Destroy existing Chart instance if it exists
            if ((canvas2 as any).chart) {
                (canvas2 as any).chart.destroy();
            }

            (canvas2 as any).chart = new Chart(ctx2, {
                type: 'line',
                data: incomeChart,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchData();
}, []);




	return (
		<div>
			<div style={{height: "400px", width: "100%", display: "flex", justifyContent: "space-between"}}>
				<div style={{height: "400px", width: "45%"}}>
					<canvas ref={canvasRef} height={150} width={300}></canvas>
				</div>
				<div style={{height: "400px", width: "45%"}}>
					<canvas ref={canvasRef2} height={150} width={300}></canvas>
				</div>
			</div>
		</div>
	)
}