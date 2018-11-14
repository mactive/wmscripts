package main

import (
	"fmt"
)

func sum(values []int, resultChan chan int) {
	sum := 0
	for _, value := range values {
		sum += value
	}
	resultChan <- sum
}

func makeRange(min, max int) []int {
	a := make([]int, max-min+1)
	for i := range a {
		a[i] = min + i
	}
	return a
}

func main() {
	values := makeRange(1, 3)
	resultChan := make(chan int, 2)
	go sum(values[len(values)/2:], resultChan)
	go sum(values[:len(values)/2], resultChan)
	sum1, sum2 := <-resultChan, <-resultChan
	fmt.Println("Result:", sum1, sum2, sum1+sum2)
}
