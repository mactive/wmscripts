package main

import (
	"fmt"
)

type Bird struct {
	name string
	age  int
}

func (b *Bird) Fly() {
	fmt.Println(b.name)
}

type IFly interface {
	Fly()
}

func main() {
	var fly IFly = new(Bird)
	fly.Fly()
}
