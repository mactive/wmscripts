package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	fmt.Printf("Abs: %x\n", v)
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

/*
 * 因为要操作传入的receiver,
 * 所以要直接取指针后面对应的值
 */
func (v *Vertex) Scale(f float64) {
	fmt.Printf("Scale: %x\n", &v)
	fmt.Printf("Scale: %x\n", v)
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(10)
	fmt.Println(v.Abs())
}
