@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Orders</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    <ul>
                        @foreach(App\Order::all() as $order)
                        <li>{{ $order }}</li>
                        @endforeach
                    </ul>

                    @include('order.create_form')
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
